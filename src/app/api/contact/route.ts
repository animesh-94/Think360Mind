import { NextResponse } from 'next/server';

interface ContactPayload {
  name?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  phone?: unknown;
  email?: unknown;
  description?: unknown;
  message?: unknown;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanString(value: unknown, maxLen = 500): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen);
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON request payload.' },
      { status: 400 }
    );
  }

  const combinedFallbackName = [cleanString(body.firstName, 80), cleanString(body.lastName, 80)]
    .filter(Boolean)
    .join(' ');
  const name = cleanString(body.name, 120) || combinedFallbackName;
  const phone = cleanString(body.phone, 40);
  const email = cleanString(body.email, 160);
  const description = cleanString(body.description, 2500) || cleanString(body.message, 2500);

  const phoneDigits = phone.replace(/\D/g, '');
  const fieldErrors: Record<string, string> = {};

  if (name.length < 2) {
    fieldErrors.name = 'Please enter your name.';
  }
  if (phoneDigits.length < 7) {
    fieldErrors.phone = 'Please enter a valid phone number.';
  }
  if (!EMAIL_REGEX.test(email)) {
    fieldErrors.email = 'Please enter a valid email address.';
  }
  if (description.length < 10) {
    fieldErrors.description = 'Please add a short description (at least 10 characters).';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Please check the highlighted fields below.',
        fieldErrors,
      },
      { status: 400 }
    );
  }

  const stamp = Date.now().toString(36).toUpperCase().slice(-4);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  const referenceId = `T360-${stamp}-${rand}`;

  const resendApiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'hello@think360media.com';

  let deliveredVia: 'resend' | 'server-log' = 'server-log';

  if (resendApiKey) {
    try {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || 'Think360 Contact <onboarding@resend.dev>',
          to: [recipientEmail],
          reply_to: email,
          subject: `[${referenceId}] New inquiry from ${name}`,
          text: [
            `Reference: ${referenceId}`,
            `Name: ${name}`,
            `Phone: ${phone}`,
            `Email: ${email}`,
            '',
            'Description:',
            description,
          ].join('\n'),
        }),
      });

      if (emailRes.ok) {
        deliveredVia = 'resend';
      }
    } catch {
      deliveredVia = 'server-log';
    }
  }

  console.info('[Think360 Contact Inquiry]', {
    referenceId,
    name,
    deliveredVia,
  });

  return NextResponse.json(
    {
      ok: true,
      referenceId,
      deliveredVia,
    },
    { status: 200 }
  );
}
