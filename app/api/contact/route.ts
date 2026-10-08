import { NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactRequestBody {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
}

// RFC 5322 compliant regex for basic email format validation
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    let body: ContactRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body;

    // Validate type presence
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, subject, and message are required." },
        { status: 400 }
      );
    }

    // Trim input values
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    // Check empty strings
    if (!trimmedName) {
      return NextResponse.json(
        { error: "Name cannot be empty." },
        { status: 400 }
      );
    }

    if (!trimmedEmail) {
      return NextResponse.json(
        { error: "Email cannot be empty." },
        { status: 400 }
      );
    }

    if (!trimmedSubject) {
      return NextResponse.json(
        { error: "Subject cannot be empty." },
        { status: 400 }
      );
    }

    if (!trimmedMessage) {
      return NextResponse.json(
        { error: "Message cannot be empty." },
        { status: 400 }
      );
    }

    // Validate email format
    if (!EMAIL_REGEX.test(trimmedEmail) || trimmedEmail.length > 254) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Validate length limits
    if (trimmedName.length > 100) {
      return NextResponse.json(
        { error: "Name exceeds the maximum allowed length (100 characters)." },
        { status: 400 }
      );
    }

    if (trimmedSubject.length > 200) {
      return NextResponse.json(
        { error: "Subject exceeds the maximum allowed length (200 characters)." },
        { status: 400 }
      );
    }

    if (trimmedMessage.length > 5000) {
      return NextResponse.json(
        { error: "Message exceeds the maximum allowed length (5000 characters)." },
        { status: 400 }
      );
    }

    // Verify environment variables
    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    if (!apiKey) {
      console.error("[Contact API] Missing RESEND_API_KEY in environment variables.");
      return NextResponse.json(
        { error: "Email service is currently unconfigured. Please contact directly via email." },
        { status: 500 }
      );
    }

    if (!recipientEmail) {
      console.error("[Contact API] Missing CONTACT_EMAIL in environment variables.");
      return NextResponse.json(
        { error: "Recipient email is currently unconfigured. Please contact directly via email." },
        { status: 500 }
      );
    }

    // Initialize Resend
    const resend = new Resend(apiKey);

    const emailSubject = `[Portfolio Contact] ${trimmedSubject}`;

    const textContent = `New message from your portfolio\n\nName: ${trimmedName}\nEmail: ${trimmedEmail}\nSubject: ${trimmedSubject}\n\nMessage:\n${trimmedMessage}\n`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181b; line-height: 1.6;">
        <div style="border-bottom: 2px solid #ff6320; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="margin: 0; color: #09090b; font-size: 20px;">New Message from Portfolio</h2>
        </div>
        <p style="margin: 6px 0;"><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
        <p style="margin: 6px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(trimmedEmail)}" style="color: #ff6320; text-decoration: none;">${escapeHtml(trimmedEmail)}</a></p>
        <p style="margin: 6px 0;"><strong>Subject:</strong> ${escapeHtml(trimmedSubject)}</p>
        <div style="margin-top: 20px; padding: 18px; background-color: #f4f4f5; border-radius: 10px; border: 1px solid #e4e4e7;">
          <strong style="display: block; margin-bottom: 8px; color: #27272a;">Message:</strong>
          <div style="white-space: pre-wrap; color: #3f3f46;">${escapeHtml(trimmedMessage)}</div>
        </div>
        <footer style="margin-top: 28px; padding-top: 14px; border-top: 1px solid #e4e4e7; font-size: 12px; color: #71717a;">
          Sent via Portfolio Contact Form · Reply directly to this email to respond to ${escapeHtml(trimmedName)}.
        </footer>
      </div>
    `.trim();

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      replyTo: trimmedEmail,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error("[Contact API] Resend API error:", error);
      return NextResponse.json(
        { error: "Failed to send message via email provider. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully." },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Contact API] Unexpected server error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
