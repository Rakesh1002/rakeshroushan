import type { APIRoute } from "astro";

export const prerender = false;

/**
 * Text-to-Speech using Cloudflare Workers AI (Deepgram Aura 2).
 * Falls back to browser TTS if no API key is set.
 *
 * Accepts JSON { text } and returns audio/mpeg stream.
 *
 * Env: CF_ACCOUNT_ID, CF_AI_TOKEN
 */
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const runtimeEnv = (locals as any).runtime?.env || {};
    const accountId = runtimeEnv.CF_ACCOUNT_ID || import.meta.env.CF_ACCOUNT_ID || "29252517c2955c4e7ffa117baf1dcbca";
    const aiToken = runtimeEnv.CF_AI_TOKEN || import.meta.env.CF_AI_TOKEN;

    if (!aiToken) {
      return new Response(
        JSON.stringify({ useBrowserTTS: true }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const { text } = await request.json();
    if (!text) {
      return new Response(
        JSON.stringify({ error: "Text is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Use Cloudflare Workers AI — Deepgram Aura 2 English TTS
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/deepgram/aura-2-en`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${aiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, speaker: "orpheus", encoding: "mp3" }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("CF AI TTS error:", err);
      throw new Error(`CF AI TTS error: ${res.status}`);
    }

    return new Response(res.body, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("TTS error:", error);
    return new Response(
      JSON.stringify({ useBrowserTTS: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
};
