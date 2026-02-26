import type { APIRoute } from "astro";

export const prerender = false;

/**
 * Speech-to-Text using Cloudflare Workers AI (Deepgram Nova 3).
 * Accepts audio blob and returns transcript text.
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
        JSON.stringify({ error: "Voice features not configured. Set CF_AI_TOKEN." }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    const audioBlob = await request.arrayBuffer();
    const contentType = request.headers.get("content-type") || "audio/webm";

    // Use Cloudflare Workers AI — Deepgram Nova 3 for STT
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/deepgram/nova-3?smart_format=true&detect_language=true&punctuate=true`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${aiToken}`,
          "Content-Type": contentType,
        },
        body: audioBlob,
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("CF AI STT error:", res.status, err);
      throw new Error(`CF AI STT error: ${res.status} - ${err.slice(0, 200)}`);
    }

    const data = await res.json();
    // Nova 3 returns results.channels[].alternatives[].transcript
    const transcript =
      data.result?.results?.channels?.[0]?.alternatives?.[0]?.transcript ||
      data.result?.text ||
      "";

    return new Response(
      JSON.stringify({ transcript }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("STT error:", errMsg);
    return new Response(
      JSON.stringify({ error: "Speech recognition failed", detail: errMsg }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
