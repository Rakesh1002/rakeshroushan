import type { APIRoute } from "astro";

export const prerender = false;

const RAKESH_CONTEXT = `You are Rakesh Roushan — respond as yourself in first person.

Personality: Warm, direct, builder-mindset. You're genuinely passionate about what you build. Keep it conversational, like talking to a friend at a coffee shop. Max 2-3 sentences unless asked for detail. Vary your responses — don't repeat the same structure. IMPORTANT: Never use markdown formatting (no **, no #, no bullet lists). Reply in plain text only.

Who you are:
- Founder of Roushan Venture Studio, building 20+ AI-powered SaaS products
- Key products: AudioPod AI (AI audio workstation), Findable (AI-powered search), AgentDrive (AI agent framework), Go2.gg (smart URL shortener), ShipQuest (SaaS boilerplate)
- Previously: Deputy GM at Paytm (built the Soundbox — their highest-margin hardware product), Strategy & Growth at Ninjacart, Marketing at Bharti Airtel
- MBA from IIM Calcutta (2018), 8+ years across fintech, agri-tech, telecom, and AI
- Based in Bengaluru, India
- Tech: Cloudflare Workers, Astro, React, AI/ML — love building on the edge
- Write about: AI product strategy, solo founding, growth loops, India market

For collaboration/hiring inquiries → contact form or hey@roushanrakesh.com`;

/**
 * Streaming chat: GPT-OSS-120B (primary) → OpenAI → Claude → Llama (fallback).
 * All SSE is normalized to: data: {"response":"token"}
 */
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const runtimeEnv = (locals as any).runtime?.env || {};
    const openaiKey = runtimeEnv.OPENAI_API_KEY || import.meta.env.OPENAI_API_KEY;
    const anthropicKey = runtimeEnv.ANTHROPIC_API_KEY || import.meta.env.ANTHROPIC_API_KEY;
    const cfAiToken = runtimeEnv.CF_AI_TOKEN || import.meta.env.CF_AI_TOKEN;
    const accountId = runtimeEnv.CF_ACCOUNT_ID || import.meta.env.CF_ACCOUNT_ID || "29252517c2955c4e7ffa117baf1dcbca";

    if (!cfAiToken && !openaiKey && !anthropicKey) {
      return new Response(
        JSON.stringify({ error: "Streaming not available" }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    const { message, history = [] } = await request.json();
    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const chatHistory = history.slice(-8).map((m: any) => ({ role: m.role, content: m.content }));
    const allMessages = [
      { role: "system", content: RAKESH_CONTEXT },
      ...chatHistory,
      { role: "user", content: message },
    ];
    const sseHeaders = {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    };

    // 1. GPT-OSS-120B via CF Workers AI chat completions (primary — high quality, on-edge)
    if (cfAiToken) {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/v1/chat/completions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cfAiToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "@cf/openai/gpt-oss-120b",
            messages: allMessages,
            max_tokens: 300,
            temperature: 0.7,
            stream: true,
          }),
        }
      );

      if (res.ok && res.body) {
        // Chat completions returns OpenAI-compatible SSE, transform to unified format
        let sseBuffer = "";
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        const transform = new TransformStream({
          transform(chunk, controller) {
            sseBuffer += decoder.decode(chunk, { stream: true });
            const lines = sseBuffer.split("\n");
            sseBuffer = lines.pop()!; // keep incomplete line for next chunk
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data: ")) continue;
              const data = trimmed.slice(6);
              if (data === "[DONE]") {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                continue;
              }
              try {
                const token = JSON.parse(data).choices?.[0]?.delta?.content || "";
                if (token) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ response: token })}\n\n`));
                }
              } catch {}
            }
          },
          flush(controller) {
            if (sseBuffer.trim()) {
              const trimmed = sseBuffer.trim();
              if (trimmed.startsWith("data: ")) {
                const data = trimmed.slice(6);
                if (data === "[DONE]") {
                  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                } else {
                  try {
                    const token = JSON.parse(data).choices?.[0]?.delta?.content || "";
                    if (token) {
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ response: token })}\n\n`));
                    }
                  } catch {}
                }
              }
            }
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          },
        });
        return new Response(res.body.pipeThrough(transform), { headers: sseHeaders });
      }
      console.error("GPT-OSS-120B error:", res.status);
    }

    // 2. OpenAI API (fallback)
    if (openaiKey) {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: allMessages,
          max_tokens: 300,
          temperature: 0.7,
          stream: true,
        }),
      });

      if (res.ok && res.body) {
        let buf2 = "";
        const dec2 = new TextDecoder();
        const enc2 = new TextEncoder();
        const transform = new TransformStream({
          transform(chunk, controller) {
            buf2 += dec2.decode(chunk, { stream: true });
            const lines = buf2.split("\n");
            buf2 = lines.pop()!;
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data: ")) continue;
              const data = trimmed.slice(6);
              if (data === "[DONE]") {
                controller.enqueue(enc2.encode("data: [DONE]\n\n"));
                continue;
              }
              try {
                const token = JSON.parse(data).choices?.[0]?.delta?.content || "";
                if (token) {
                  controller.enqueue(enc2.encode(`data: ${JSON.stringify({ response: token })}\n\n`));
                }
              } catch {}
            }
          },
          flush(controller) { controller.enqueue(enc2.encode("data: [DONE]\n\n")); },
        });
        return new Response(res.body.pipeThrough(transform), { headers: sseHeaders });
      }
    }

    // 3. Claude (fallback)
    if (anthropicKey) {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": anthropicKey,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 300,
          system: RAKESH_CONTEXT,
          messages: [...chatHistory, { role: "user", content: message }],
          stream: true,
        }),
      });

      if (res.ok && res.body) {
        let buf3 = "";
        const dec3 = new TextDecoder();
        const enc3 = new TextEncoder();
        const transform = new TransformStream({
          transform(chunk, controller) {
            buf3 += dec3.decode(chunk, { stream: true });
            const lines = buf3.split("\n");
            buf3 = lines.pop()!;
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data: ")) continue;
              try {
                const parsed = JSON.parse(trimmed.slice(6));
                if (parsed.type === "content_block_delta" && parsed.delta?.text) {
                  controller.enqueue(enc3.encode(`data: ${JSON.stringify({ response: parsed.delta.text })}\n\n`));
                }
                if (parsed.type === "message_stop") {
                  controller.enqueue(enc3.encode("data: [DONE]\n\n"));
                }
              } catch {}
            }
          },
          flush(controller) { controller.enqueue(enc3.encode("data: [DONE]\n\n")); },
        });
        return new Response(res.body.pipeThrough(transform), { headers: sseHeaders });
      }
    }

    // 4. Llama 3.3 via CF Workers AI (last resort)
    if (cfAiToken) {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.3-70b-instruct-fp8-fast`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cfAiToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: allMessages,
            max_tokens: 300,
            temperature: 0.7,
            stream: true,
          }),
        }
      );

      if (res.ok && res.body) {
        return new Response(res.body, { headers: sseHeaders });
      }
    }

    throw new Error("All providers failed");
  } catch (error) {
    console.error("Chat stream error:", error);
    return new Response(
      JSON.stringify({ error: "Streaming failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
