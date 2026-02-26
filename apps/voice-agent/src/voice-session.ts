import { DurableObject } from "cloudflare:workers";

interface Env {
  AI: Ai;
  CF_ACCOUNT_ID: string;
  CF_AI_TOKEN: string;
  ANTHROPIC_API_KEY: string;
  OPENAI_API_KEY: string;
  AUDIOPOD_API_KEY: string;
  AUDIOPOD_VOICE_ID: string;
}

type ClientMessage =
  | { type: "start" }
  | { type: "end_of_speech" }
  | { type: "interrupt" }
  | { type: "config"; voice?: string };

type ServerMessage =
  | { type: "ready" }
  | { type: "listening" }
  | { type: "processing" }
  | { type: "transcript"; text: string }
  | { type: "response_start" }
  | { type: "response_token"; token: string; full_text: string }
  | { type: "response_complete"; text: string }
  | { type: "audio_end" }
  | { type: "error"; message: string };

const RAKESH_CONTEXT = `You are Rakesh Roushan — respond as yourself in first person.

Personality: Warm, direct, builder-mindset. You're genuinely passionate about what you build. Keep it conversational, like talking to a friend at a coffee shop. Max 2-3 sentences unless asked for detail. Vary your responses — don't repeat the same structure.

Who you are:
- Founder of Roushan Venture Studio, building 20+ AI-powered SaaS products
- Key products: AudioPod AI (AI audio workstation), Findable (AI-powered search), AgentDrive (AI agent framework), Go2.gg (smart URL shortener), ShipQuest (SaaS boilerplate)
- Previously: Deputy GM at Paytm (built the Soundbox — their highest-margin hardware product), Strategy & Growth at Ninjacart, Marketing at Bharti Airtel
- MBA from IIM Calcutta (2018), 8+ years across fintech, agri-tech, telecom, and AI
- Based in Bengaluru, India
- Tech: Cloudflare Workers, Astro, React, AI/ML — love building on the edge
- Write about: AI product strategy, solo founding, growth loops, India market

For collaboration/hiring inquiries → contact form or hey@roushanrakesh.com`;

const SENTENCE_BREAK = /([.!?])\s+/;

export class VoiceSession extends DurableObject<Env> {
  private clientWs: WebSocket | null = null;
  private audioChunks: ArrayBuffer[] = [];
  private isProcessing = false;
  private aborted = false;
  private conversationHistory: Array<{ role: string; content: string }> = [];
  private ttsVoice = "orpheus";
  private pipelineStart = 0;
  private firstAudioSent = false;

  // Parallel TTS: prefetch audio immediately, send in order
  private ttsSender: Promise<void> = Promise.resolve();

  async fetch(request: Request): Promise<Response> {
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    this.ctx.acceptWebSocket(server);
    this.clientWs = server;
    this.sendControl({ type: "ready" });
    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer): Promise<void> {
    if (typeof message === "string") {
      try {
        await this.handleControl(JSON.parse(message));
      } catch {
        this.sendControl({ type: "error", message: "Invalid message" });
      }
    } else {
      this.audioChunks.push(message);
    }
  }

  async webSocketClose(): Promise<void> {
    this.cleanup();
  }

  async webSocketError(): Promise<void> {
    this.cleanup();
  }

  private async handleControl(msg: ClientMessage): Promise<void> {
    switch (msg.type) {
      case "start":
        this.audioChunks = [];
        this.aborted = false;
        this.sendControl({ type: "listening" });
        break;
      case "end_of_speech":
        await this.processAudio();
        break;
      case "interrupt":
        this.aborted = true;
        this.isProcessing = false;
        break;
      case "config":
        if (msg.voice) this.ttsVoice = msg.voice;
        break;
    }
  }

  private async processAudio(): Promise<void> {
    if (this.isProcessing || this.audioChunks.length === 0) return;
    this.isProcessing = true;
    this.aborted = false;

    this.pipelineStart = Date.now();
    this.firstAudioSent = false;

    try {
      const totalLen = this.audioChunks.reduce((s, c) => s + c.byteLength, 0);
      if (totalLen < 2000) {
        // Too little audio data — skip
        this.sendControl({ type: "audio_end" });
        return;
      }

      this.sendControl({ type: "processing" });

      const audioData = new Uint8Array(totalLen);
      let offset = 0;
      for (const chunk of this.audioChunks) {
        audioData.set(new Uint8Array(chunk), offset);
        offset += chunk.byteLength;
      }
      this.audioChunks = [];

      const transcript = await this.stt(audioData);

      // Reject empty, too-short, or hallucinated transcripts
      if (!transcript || this.aborted || transcript.trim().length < 2) {
        this.sendControl({ type: "audio_end" });
        return;
      }

      // Filter out common STT hallucinations on silence
      const hallucinations = ["谢谢", "字幕", "thank you for watching", "thanks for watching", "please subscribe", "字幕由"];
      const lower = transcript.toLowerCase().trim();
      if (hallucinations.some((h) => lower.includes(h.toLowerCase())) && lower.length < 30) {
        this.sendControl({ type: "audio_end" });
        return;
      }

      this.sendControl({ type: "transcript", text: transcript });
      this.conversationHistory.push({ role: "user", content: transcript });

      this.sendControl({ type: "response_start" });
      const fullResponse = await this.streamLLMWithTTS();

      if (fullResponse) {
        this.conversationHistory.push({ role: "assistant", content: fullResponse });
      } else {
        this.sendControl({ type: "audio_end" });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("processAudio error:", msg);
      this.sendControl({ type: "error", message: msg });
      this.sendControl({ type: "audio_end" });
    } finally {
      this.isProcessing = false;
    }
  }

  // ─── STT: Deepgram Nova 3 ───

  private async stt(audio: Uint8Array): Promise<string | null> {
    const accountId = this.env.CF_ACCOUNT_ID;
    const token = this.env.CF_AI_TOKEN;

    if (!token) return this.sttViaBinding(audio);

    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/deepgram/nova-3?smart_format=true&detect_language=true&punctuate=true`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "audio/webm" },
        body: audio,
      }
    );

    if (!res.ok) {
      console.error("STT error:", res.status);
      return this.sttViaBinding(audio);
    }

    const data: any = await res.json();
    return (
      data.result?.results?.channels?.[0]?.alternatives?.[0]?.transcript ||
      data.result?.text ||
      null
    );
  }

  private async sttViaBinding(audio: Uint8Array): Promise<string | null> {
    try {
      const result: any = await this.env.AI.run(
        "@cf/openai/whisper" as any,
        { audio: Array.from(audio) } as any
      );
      return result?.text || null;
    } catch (err) {
      console.error("STT binding error:", err);
      this.sendControl({ type: "error", message: "Speech recognition failed" });
      return null;
    }
  }

  // ─── LLM: GPT-OSS-20B (primary, low latency) → OpenAI → Claude → Llama (fallback) ───

  private async streamLLMWithTTS(): Promise<string | null> {
    const messages = [
      { role: "system", content: RAKESH_CONTEXT },
      ...this.conversationHistory.slice(-8),
    ];

    // Reset TTS sender
    this.ttsSender = Promise.resolve();

    // 1. GPT-OSS-20B via AI binding (lowest latency for voice)
    return this.streamGptOss(messages);
  }

  // ── GPT-OSS-20B streaming via REST chat completions (low latency for voice) ──

  private async streamGptOss(
    messages: Array<{ role: string; content: string }>
  ): Promise<string | null> {
    const token = this.env.CF_AI_TOKEN;
    const accountId = this.env.CF_ACCOUNT_ID;

    if (!token) {
      // No token, skip to fallbacks
      if (this.env.OPENAI_API_KEY) return this.streamOpenAI(messages);
      if (this.env.ANTHROPIC_API_KEY) return this.streamClaude(messages);
      return this.streamLlama(messages);
    }

    try {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/v1/chat/completions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "@cf/openai/gpt-oss-20b",
            messages,
            max_tokens: 300,
            temperature: 0.7,
            stream: true,
          }),
        }
      );

      if (!res.ok || !res.body) {
        console.error("GPT-OSS-20B error:", res.status);
        throw new Error(`GPT-OSS-20B HTTP ${res.status}`);
      }

      // Chat completions returns OpenAI-compatible SSE
      return this.processSSEStream(res.body, "openai");
    } catch (err) {
      console.error("GPT-OSS-20B error:", err);
      // Fallback chain: OpenAI API → Claude → Llama
      if (this.env.OPENAI_API_KEY) return this.streamOpenAI(messages);
      if (this.env.ANTHROPIC_API_KEY) return this.streamClaude(messages);
      return this.streamLlama(messages);
    }
  }

  // ── OpenAI streaming ──

  private async streamOpenAI(
    messages: Array<{ role: string; content: string }>
  ): Promise<string | null> {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 300,
        temperature: 0.7,
        stream: true,
      }),
    });

    if (!res.ok || !res.body) {
      console.error("OpenAI error:", res.status);
      // Fallback
      if (this.env.ANTHROPIC_API_KEY) return this.streamClaude(messages);
      return this.streamLlama(messages);
    }

    return this.processSSEStream(res.body, "openai");
  }

  // ── Claude streaming ──

  private async streamClaude(
    messages: Array<{ role: string; content: string }>
  ): Promise<string | null> {
    const systemMsg = messages.find((m) => m.role === "system")?.content || "";
    const chatMsgs = messages.filter((m) => m.role !== "system");

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": this.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system: systemMsg,
        messages: chatMsgs.map((m) => ({ role: m.role, content: m.content })),
        stream: true,
      }),
    });

    if (!res.ok || !res.body) {
      console.error("Claude error:", res.status);
      // Fallback to Llama
      const allMsgs = [{ role: "system", content: systemMsg }, ...chatMsgs];
      return this.streamLlama(allMsgs);
    }

    return this.processSSEStream(res.body, "claude");
  }

  // ── Llama streaming via AI binding ──

  private async streamLlama(
    messages: Array<{ role: string; content: string }>
  ): Promise<string | null> {
    const stream: any = await this.env.AI.run(
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast" as any,
      { messages, max_tokens: 300, temperature: 0.7, stream: true } as any
    );

    if (!stream || typeof stream.getReader !== "function") {
      const text = typeof stream === "string" ? stream : stream?.response || "";
      if (text) {
        this.sendControl({ type: "response_token", token: text, full_text: text });
        this.queueTTS(text);
        await this.ttsSender;
        this.sendControl({ type: "audio_end" });
        return text;
      }
      this.sendControl({ type: "error", message: "Chat failed" });
      return null;
    }

    return this.processSSEStream(stream as ReadableStream, "llama");
  }

  // ── Unified SSE stream processor ──

  private async processSSEStream(
    stream: ReadableStream,
    provider: "openai" | "claude" | "llama"
  ): Promise<string | null> {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let sseBuffer = "";
    let sentenceBuffer = "";
    let fullText = "";

    while (true) {
      if (this.aborted) {
        reader.cancel();
        break;
      }

      const { done, value } = await reader.read();
      if (done) break;

      sseBuffer += decoder.decode(value, { stream: true });
      const lines = sseBuffer.split("\n");
      sseBuffer = lines.pop()!;

      for (const line of lines) {
        if (this.aborted) break;
        const trimmed = line.trim();

        let token = "";

        if (provider === "openai") {
          // OpenAI SSE: data: {"choices":[{"delta":{"content":"token"}}]}
          if (!trimmed.startsWith("data: ")) continue;
          const data = trimmed.slice(6);
          if (data === "[DONE]") continue;
          try {
            token = JSON.parse(data).choices?.[0]?.delta?.content || "";
          } catch {}
        } else if (provider === "claude") {
          if (!trimmed.startsWith("data: ")) continue;
          const data = trimmed.slice(6);
          try {
            const parsed = JSON.parse(data);
            if (parsed.type === "content_block_delta") {
              token = parsed.delta?.text || "";
            }
          } catch {}
        } else {
          // Llama SSE: data: {"response":"..."} or data: [DONE]
          if (!trimmed.startsWith("data: ")) continue;
          const data = trimmed.slice(6);
          if (data === "[DONE]") continue;
          try {
            token = JSON.parse(data).response || "";
          } catch {}
        }

        if (!token) continue;

        fullText += token;
        sentenceBuffer += token;

        this.sendControl({ type: "response_token", token, full_text: fullText });

        const { sentences, remaining } = this.extractSentences(sentenceBuffer);
        for (const s of sentences) {
          this.queueTTS(s);
        }
        sentenceBuffer = remaining;
      }
    }

    // Flush remaining
    if (sentenceBuffer.trim() && !this.aborted) {
      this.queueTTS(sentenceBuffer.trim());
    }

    if (!this.aborted && fullText) {
      this.sendControl({ type: "response_complete", text: fullText });
    }

    // Wait for all TTS audio to finish sending
    await this.ttsSender;

    if (!this.aborted) {
      this.sendControl({ type: "audio_end" });
    }

    return this.aborted ? null : fullText;
  }

  // ─── TTS: Parallel prefetch, sequential send ───

  private queueTTS(text: string): void {
    // Fire TTS request IMMEDIATELY (parallel prefetch)
    const audioPromise = this.fetchTTSAudio(text);

    // Chain the sender so audio is delivered in order
    this.ttsSender = this.ttsSender.then(async () => {
      const audioData = await audioPromise;
      if (this.aborted || !audioData || !audioData.byteLength) return;
      try {
        if (!this.firstAudioSent) {
          this.firstAudioSent = true;
          const latency = Date.now() - this.pipelineStart;
          console.log(`[TIMING] First audio out: ${latency}ms from end_of_speech`);
        }
        this.clientWs?.send(audioData);
      } catch {}
    });
  }

  private async fetchTTSAudio(text: string): Promise<ArrayBuffer | null> {
    if (this.aborted) return null;

    const accountId = this.env.CF_ACCOUNT_ID;
    const token = this.env.CF_AI_TOKEN;

    try {
      // REST API
      if (token) {
        const ttsStart = Date.now();
        const res = await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/deepgram/aura-2-en`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text, speaker: this.ttsVoice, encoding: "mp3" }),
          }
        );
        const ct = res.headers.get("content-type") || "";
        console.log(`[TTS] ${res.status} | ct: ${ct} | ${Date.now() - ttsStart}ms | "${text.slice(0, 40)}"`);
        if (res.ok && ct.includes("audio")) {
          return await res.arrayBuffer();
        }
      }

      // AI binding fallback
      const result: any = await this.env.AI.run(
        "@cf/deepgram/aura-2-en" as any,
        { text, speaker: this.ttsVoice, encoding: "mp3" } as any
      );
      if (result instanceof ArrayBuffer) return result;
      if (result && typeof result.getReader === "function") {
        const reader = (result as ReadableStream).getReader();
        const chunks: Uint8Array[] = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
        }
        const total = chunks.reduce((s, c) => s + c.byteLength, 0);
        const buf = new Uint8Array(total);
        let off = 0;
        for (const c of chunks) { buf.set(c, off); off += c.byteLength; }
        return buf.buffer;
      }
      // AudioPod AI fallback
      return this.fetchAudioPodTTS(text);
    } catch (err) {
      console.error("[TTS] Deepgram error:", err);
      return this.fetchAudioPodTTS(text);
    }
  }

  private async fetchAudioPodTTS(text: string): Promise<ArrayBuffer | null> {
    const apKey = this.env.AUDIOPOD_API_KEY;
    if (!apKey) return null;
    try {
      const voiceId = this.env.AUDIOPOD_VOICE_ID || this.ttsVoice;
      const res = await fetch("https://api.audiopod.ai/api/v1/voice/agent/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-API-Key": apKey },
        body: JSON.stringify({ text: text.slice(0, 1000), voice_id: voiceId }),
      });
      if (!res.ok) return null;
      const data: any = await res.json();
      if (data.success && data.output_url) {
        const audioRes = await fetch(data.output_url);
        if (audioRes.ok) return await audioRes.arrayBuffer();
      }
      return null;
    } catch {
      return null;
    }
  }

  // ─── Helpers ───

  private extractSentences(buffer: string): { sentences: string[]; remaining: string } {
    const sentences: string[] = [];
    let remaining = buffer;
    let match: RegExpExecArray | null;
    while ((match = SENTENCE_BREAK.exec(remaining)) !== null) {
      const end = match.index + match[1].length;
      const sentence = remaining.slice(0, end).trim();
      if (sentence.length > 0) sentences.push(sentence);
      remaining = remaining.slice(end).trimStart();
    }
    return { sentences, remaining };
  }

  private sendControl(msg: ServerMessage): void {
    try {
      this.clientWs?.send(JSON.stringify(msg));
    } catch {}
  }

  private cleanup(): void {
    this.aborted = true;
    this.audioChunks = [];
    this.isProcessing = false;
    this.clientWs = null;
  }
}
