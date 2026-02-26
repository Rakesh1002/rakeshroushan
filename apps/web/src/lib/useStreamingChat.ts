import { useRef, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface StreamChatOptions {
  message: string;
  history: Message[];
  signal?: AbortSignal;
  onToken: (token: string, fullText: string) => void;
  onSentence: (sentence: string) => void;
  onComplete: (fullText: string) => void;
  onError: (error: Error) => void;
}

// Detect sentence boundaries: `. `, `! `, `? ` or end of stream
const SENTENCE_BREAK = /([.!?])\s+/;

function extractSentences(buffer: string): { sentences: string[]; remaining: string } {
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

export function useStreamingChat() {
  const abortRef = useRef<AbortController | null>(null);

  const streamChat = useCallback(async (opts: StreamChatOptions) => {
    const { message, history, signal, onToken, onSentence, onComplete, onError } = opts;

    try {
      const res = await fetch("/api/chat-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
        signal,
      });

      if (!res.ok || !res.body) {
        // Fall back to non-streaming endpoint
        const fallback = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, history }),
          signal,
        });
        const data = await fallback.json();
        const reply = data.reply || "Sorry, I couldn't process that.";
        onToken(reply, reply);
        onSentence(reply);
        onComplete(reply);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let sseBuffer = "";
      let sentenceBuffer = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        sseBuffer += decoder.decode(value, { stream: true });

        // Parse SSE lines
        const lines = sseBuffer.split("\n");
        sseBuffer = lines.pop()!; // keep incomplete line

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data: ")) continue;

          const data = trimmed.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            const token = parsed.response || "";
            if (!token) continue;

            fullText += token;
            sentenceBuffer += token;
            onToken(token, fullText);

            // Extract complete sentences
            const { sentences, remaining } = extractSentences(sentenceBuffer);
            for (const s of sentences) {
              onSentence(s);
            }
            sentenceBuffer = remaining;
          } catch {
            // skip malformed JSON
          }
        }
      }

      // Flush remaining text as final sentence
      if (sentenceBuffer.trim()) {
        onSentence(sentenceBuffer.trim());
      }

      onComplete(fullText);
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      onError(err instanceof Error ? err : new Error(String(err)));
    }
  }, []);

  const abort = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  return { streamChat, abort, abortRef };
}
