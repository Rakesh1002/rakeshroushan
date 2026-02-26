import { VoiceSession } from "./voice-session";

export { VoiceSession };

export interface Env {
  AI: Ai;
  VOICE_SESSION: DurableObjectNamespace<VoiceSession>;
  CF_ACCOUNT_ID: string;
  CF_AI_TOKEN: string;
  ANTHROPIC_API_KEY: string;
  OPENAI_API_KEY: string;
  ALLOWED_ORIGIN: string;
}

function corsHeaders(origin: string, allowed: string): Record<string, string> {
  const isAllowed =
    allowed === "*" ||
    origin === allowed ||
    origin === "http://localhost:4321" ||
    origin === "http://localhost:3000";

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : allowed,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Upgrade",
    "Access-Control-Max-Age": "86400",
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin, env.ALLOWED_ORIGIN || "*");

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    // Health check
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ status: "ok", service: "voice-agent" }), {
        headers: { "Content-Type": "application/json", ...cors },
      });
    }

    // WebSocket upgrade for voice session
    if (url.pathname === "/session") {
      const upgradeHeader = request.headers.get("Upgrade");
      if (upgradeHeader?.toLowerCase() !== "websocket") {
        return new Response("Expected WebSocket upgrade", {
          status: 426,
          headers: cors,
        });
      }

      // Each connection gets a unique session DO
      const sessionId = url.searchParams.get("id") || crypto.randomUUID();
      const id = env.VOICE_SESSION.idFromName(sessionId);
      const stub = env.VOICE_SESSION.get(id);

      return stub.fetch(request);
    }

    return new Response("Not Found", { status: 404, headers: cors });
  },
} satisfies ExportedHandler<Env>;
