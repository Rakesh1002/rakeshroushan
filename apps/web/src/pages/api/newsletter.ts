import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: "Valid email is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const runtimeEnv = (locals as any).runtime?.env || {};
    const resendKey = runtimeEnv.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
    if (!resendKey) {
      console.log("Newsletter signup (no RESEND_API_KEY configured):", email);
      return new Response(
        JSON.stringify({ success: true, message: "Subscribed" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const resend = new Resend(resendKey);

    // Add contact to Resend audience
    const audienceId = runtimeEnv.RESEND_AUDIENCE_ID || import.meta.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      await resend.contacts.create({
        email,
        audienceId,
      });
    }

    // Send welcome email
    await resend.emails.send({
      from: "Rakesh Roushan <hey@roushanrakesh.com>",
      to: email,
      subject: "Welcome — Frameworks for Builders",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">Welcome aboard.</h1>
          <p style="color: #555; line-height: 1.7; margin-bottom: 16px;">
            Thanks for subscribing. Every week, I share frameworks on AI product strategy,
            execution systems, and lessons from building 20+ products as a solo founder.
          </p>
          <p style="color: #555; line-height: 1.7; margin-bottom: 16px;">
            No fluff — just things you can use Monday morning.
          </p>
          <p style="color: #555; line-height: 1.7; margin-bottom: 24px;">
            In the meantime, check out my latest writing at
            <a href="https://roushanrakesh.com/blog" style="color: #d97706;">roushanrakesh.com/blog</a>.
          </p>
          <p style="color: #555; line-height: 1.7;">
            — Rakesh
          </p>
        </div>
      `,
    });

    // Notify yourself
    await resend.emails.send({
      from: "Newsletter <noreply@roushanrakesh.com>",
      to: "hey@roushanrakesh.com",
      subject: `New subscriber: ${email}`,
      html: `<p>New newsletter subscriber: <strong>${email}</strong></p>`,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Subscribed" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to subscribe" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
