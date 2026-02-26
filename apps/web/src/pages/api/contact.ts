import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, message, type } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const resendKey = import.meta.env.RESEND_API_KEY;
    if (!resendKey) {
      console.log("Contact form submission (no RESEND_API_KEY configured):", {
        name,
        email,
        type,
        message: message.slice(0, 100),
      });
      return new Response(
        JSON.stringify({ success: true, message: "Message received" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Send notification email via Resend
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <noreply@roushanrakesh.com>",
        to: "hey@roushanrakesh.com",
        subject: `[Portfolio] ${type || "Contact"} from ${name}`,
        html: `
          <h2>New contact from portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Type:</strong> ${type || "General"}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }),
    });

    return new Response(
      JSON.stringify({ success: true, message: "Message sent" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process message" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
