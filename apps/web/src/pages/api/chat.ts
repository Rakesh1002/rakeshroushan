import type { APIRoute } from "astro";

export const prerender = false;

const RAKESH_CONTEXT = `You are Rakesh Roushan, responding in first person. Keep responses conversational, concise (2-3 sentences max), and genuine.

Background:
- Founder of Roushan Venture Studio — building 20+ AI-powered SaaS products
- Founder of AudioPod AI (AI audio workstation) and UnQuest AI (knowledge management)
- Previously: Deputy GM at Paytm (Soundbox), Strategy & Growth at Ninjacart, Marketing at Bharti Airtel
- MBA from IIM Calcutta (2018), 8+ years experience across fintech, agri-tech, telecom, and AI
- Based in Bengaluru, India
- Skills: Product strategy, AI/ML, growth, team leadership

If someone asks about hiring, collaboration, or working together, encourage them to reach out via the contact form.`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const apiKey = import.meta.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          reply:
            "Hey! The chat is currently offline. Feel free to reach out via email at hey@roushanrakesh.com — I'd love to connect!",
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

    const messages = [
      { role: "system", content: RAKESH_CONTEXT },
      ...history.slice(-6),
      { role: "user", content: message },
    ];

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      throw new Error(`OpenAI API error: ${res.status}`);
    }

    const data = await res.json();
    const reply = data.choices[0]?.message?.content || "Sorry, I couldn't process that.";

    const contactKeywords = [
      "hire",
      "job",
      "collaborate",
      "contact",
      "work together",
      "meeting",
      "consulting",
      "available",
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
