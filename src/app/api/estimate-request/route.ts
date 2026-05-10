import { NextResponse } from "next/server";

import { business } from "@/data/business";

export const runtime = "nodejs";

const maxFiles = 6;
const maxTotalBytes = 12 * 1024 * 1024;

function textValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function cleanFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 80) || "issue-photo.jpg";
}

function buildEmailHtml(fields: Record<string, string>, photoCount: number) {
  const rows = Object.entries(fields)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 10px;border:1px solid #d9e1ea;font-weight:700;">${escapeHtml(label)}</td>
          <td style="padding:8px 10px;border:1px solid #d9e1ea;">${escapeHtml(value).replace(/\n/g, "<br />")}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#172033;line-height:1.5;">
      <h1 style="margin:0 0 12px;">New Repair Request</h1>
      <p style="margin:0 0 16px;">A customer submitted a repair request from ${escapeHtml(business.websiteUrl)}.</p>
      <table style="border-collapse:collapse;width:100%;max-width:760px;">${rows}</table>
      <p style="margin-top:16px;"><strong>Attached photos:</strong> ${photoCount}</p>
    </div>
  `;
}

export async function POST(request: Request) {
  const formData = await request.formData();

  if (textValue(formData, "company")) {
    return NextResponse.json({ message: "Request received." });
  }

  const fields = {
    Name: textValue(formData, "name"),
    Phone: textValue(formData, "phone"),
    Email: textValue(formData, "email"),
    "Preferred Contact": textValue(formData, "preferredContact"),
    Address: textValue(formData, "address"),
    City: textValue(formData, "city"),
    Urgency: textValue(formData, "urgency"),
    Service: textValue(formData, "service"),
    "Issue Description": textValue(formData, "message"),
  };

  const requiredFields = ["Name", "Phone", "Email", "Address", "City", "Service", "Issue Description"];
  const missingField = requiredFields.find((key) => !fields[key as keyof typeof fields]);

  if (missingField) {
    return NextResponse.json(
      { message: `${missingField} is required.` },
      { status: 400 },
    );
  }

  const photoValues = formData.getAll("photos").filter((item): item is File => item instanceof File);
  const photos = photoValues.filter((file) => file.size > 0).slice(0, maxFiles);
  const totalBytes = photos.reduce((sum, file) => sum + file.size, 0);

  if (totalBytes > maxTotalBytes) {
    return NextResponse.json(
      { message: "Photos are too large. Please upload up to 12 MB total." },
      { status: 400 },
    );
  }

  const invalidPhoto = photos.find((file) => !file.type.startsWith("image/"));

  if (invalidPhoto) {
    return NextResponse.json(
      { message: "Only image uploads are accepted." },
      { status: 400 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return NextResponse.json(
      { message: "Email delivery is not configured yet. Please call instead." },
      { status: 503 },
    );
  }

  const attachments = await Promise.all(
    photos.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      return {
        filename: cleanFileName(file.name),
        content: Buffer.from(arrayBuffer).toString("base64"),
      };
    }),
  );

  const to = process.env.CONTACT_TO_EMAIL ?? business.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Timber & Testament <onboarding@resend.dev>";
  const replyTo = fields.Email;
  const subject = `[${fields.Urgency}] ${fields.Service} - ${fields.City}`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: replyTo,
      subject,
      html: buildEmailHtml(fields, attachments.length),
      attachments,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "The email could not be sent. Please call instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Request sent. We will review the details and photos shortly.",
  });
}
