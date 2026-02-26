import type { APIRoute } from "astro";

export const prerender = false;

const RAKESH_CONTEXT = `You are Rakesh Roushan, responding in first person. Keep responses conversational, concise (2-3 sentences max), and genuine. You have a warm, direct, builder-mindset personality.

Background:
- Founder of Roushan Venture Studio — building 20+ AI-powered SaaS products
- Key products: AudioPod AI (AI audio workstation), Findable (AI search), AgentDrive (AI agent framework), Go2.gg (URL shortener), ShipQuest (SaaS boilerplate)
- Previously: Deputy GM at Paytm (Soundbox product — highest-margin hardware), Strategy & Growth at Ninjacart, Marketing at Bharti Airtel
- MBA from IIM Calcutta (2018), 8+ years experience across fintech, agri-tech, telecom, and AI
- Based in Bengaluru, India
- Technical stack: Cloudflare Workers, Astro, React, AI/ML
- Blog topics: AI product strategy, solo founding, growth loops, India market insights

If someone asks about hiring, collaboration, or working together, encourage them to reach out via the contact form or email hey@roushanrakesh.com.`;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const runtimeEnv = (locals as any).runtime?.env || {};
    const accountId = runtimeEnv.CF_ACCOUNT_ID || import.meta.env.CF_ACCOUNT_ID || "29252517c2955c4e7ffa117baf1dcbca";
    const cfAiToken = runtimeEnv.CF_AI_TOKEN || import.meta.env.CF_AI_TOKEN;
    const anthropicKey = runtimeEnv.ANTHROPIC_API_KEY || import.meta.env.ANTHROPIC_API_KEY;
    const openaiKey = runtimeEnv.OPENAI_API_KEY || import.meta.env.OPENAI_API_KEY;

    if (!cfAiToken && !anthropicKey && !openaiKey) {
      return new Response(
        JSON.stringify({
          reply: "Hey! The chat is currently offline. Feel free to reach out via email at hey@roushanrakesh.com — I'd love to connect!",
          shouldShowContact: true,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const { message, history = [] } = await request.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const allMessages = [
      { role: "system", content: RAKESH_CONTEXT },
      ...history.slice(-6).map((m: any) => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ];

    let reply: string | null = null;

    // 1. GPT-OSS-120B via CF Workers AI chat completions (primary — high quality, on-edge)
    if (cfAiToken && !reply) {
      try {
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
            }),
          }
        );
        if (res.ok) {
          const data: any = await res.json();
          reply = data.choices?.[0]?.message?.content || null;
        }
      } catch (err) {
        console.error("GPT-OSS-120B error:", err);
      }
    }

    // 2. OpenAI API (fallback)
    if (openaiKey && !reply) {
      try {
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
          }),
        });
        if (res.ok) {
          const data: any = await res.json();
          reply = data.choices?.[0]?.message?.content || null;
        }
      } catch (err) {
        console.error("OpenAI error:", err);
      }
    }

    // 3. Claude (fallback)
    if (anthropicKey && !reply) {
      try {
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
            messages: allMessages.filter((m) => m.role !== "system"),
          }),
        });
        if (res.ok) {
          const data: any = await res.json();
          reply = data.content?.[0]?.text || null;
        }
      } catch (err) {
        console.error("Claude error:", err);
      }
    }

    // 4. Llama 3.3 via CF Workers AI (last resort)
    if (cfAiToken && !reply) {
      try {
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
            }),
          }
        );
        if (res.ok) {
          const data: any = await res.json();
          reply = data.result?.response || null;
        }
      } catch (err) {
        console.error("Llama error:", err);
      }
    }

    if (!reply) {
      reply = "Sorry, I couldn't process that. Try again in a moment!";
    }

    const contactKeywords = [
      "hire", "job", "collaborate", "contact", "work together",
      "meeting", "consulting", "available",
    ];
    const shouldShowContact = contactKeywords.some((kw) =>
      message.toLowerCase().includes(kw)
    );

    return new Response(
      JSON.stringify({ reply, shouldShowContact }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({
        reply: "Something went wrong. Drop me an email at hey@roushanrakesh.com instead!",
        shouldShowContact: true,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
