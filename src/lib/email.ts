/**
 * email.ts - Resend Email Notification Dispatcher (Native Fetch)
 * 
 * Uses standard native fetch directly to Resend REST API (https://api.resend.com/emails).
 * Zero dependencies, ultra-lightweight, and fully portable across Vercel serverless.
 */

function getEnv(key: string, fallback = ''): string {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  try {
    if (import.meta && (import.meta as any).env && (import.meta as any).env[key]) {
      return (import.meta as any).env[key];
    }
  } catch {}
  return fallback;
}

export const isResendConfigured = Boolean(
  getEnv('RESEND_API_KEY') && !getEnv('RESEND_API_KEY').includes('placeholder')
);

async function callResendApi(payload: {
  from: string;
  to: string[];
  reply_to?: string;
  subject: string;
  html: string;
}) {
  const apiKey = getEnv('RESEND_API_KEY');
  if (!apiKey || apiKey.includes('placeholder')) {
    console.warn('[Email] RESEND_API_KEY not configured. Mocking notification for:', payload.to);
    return { success: true, mocked: true };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error('[Resend API Error]:', data);
      return { success: false, error: data };
    }

    return { success: true, data };
  } catch (err) {
    console.error('[Email Dispatch Network Error]:', err);
    return { success: false, error: err };
  }
}

/**
 * Dispatch notification email when a new contact inquiry arrives
 */
export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const adminEmail = getEnv('ADMIN_EMAIL', 'syedtawseef0@gmail.com');
  const fromEmail = getEnv('FROM_EMAIL', 'Unity Compass <onboarding@resend.dev>');

  return callResendApi({
    from: fromEmail,
    to: [adminEmail],
    reply_to: data.email,
    subject: `[New Inquiry] ${data.name} via Unity Compass Contact Form`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="border-bottom: 2px solid #0C487A; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #0B2553; margin: 0; font-size: 20px;">New Federal Contact Inquiry</h2>
          <p style="color: #64748b; margin: 4px 0 0 0; font-size: 13px;">Unity Compass Advisory Portal</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 120px; font-weight: bold;">Full Name:</td>
            <td style="padding: 8px 0; color: #0B2553; font-size: 14px; font-weight: 600;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0; color: #0C487A; font-size: 14px;"><a href="mailto:${data.email}" style="color: #0C487A; text-decoration: none;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: bold;">Phone:</td>
            <td style="padding: 8px 0; color: #0B2553; font-size: 14px;"><a href="tel:${data.phone}" style="color: #0B2553; text-decoration: none;">${data.phone}</a></td>
          </tr>
        </table>

        <div style="background-color: #f8fafc; border-left: 4px solid #FF3130; padding: 14px 16px; border-radius: 6px; margin-bottom: 24px;">
          <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; text-align: center;">
          <a href="https://unitycompass.com/admin" style="display: inline-block; background-color: #0B2553; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 13px; font-weight: 600;">Open Admin Dashboard</a>
        </div>
      </div>
    `,
  });
}

/**
 * Dispatch notification email when a candidate applies for a job
 */
export async function sendJobApplicationNotification(data: {
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  jobTitle: string;
  resumeUrl: string;
}) {
  const adminEmail = getEnv('ADMIN_EMAIL', 'syedtawseef0@gmail.com');
  const fromEmail = getEnv('FROM_EMAIL', 'Unity Compass <onboarding@resend.dev>');

  return callResendApi({
    from: fromEmail,
    to: [adminEmail],
    reply_to: data.candidateEmail,
    subject: `[New Applicant] ${data.candidateName} for ${data.jobTitle}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="border-bottom: 2px solid #FF3130; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #0B2553; margin: 0; font-size: 20px;">New Job Application Received</h2>
          <p style="color: #64748b; margin: 4px 0 0 0; font-size: 13px;">Unity Compass Talent Network</p>
        </div>

        <div style="background-color: #f1f5f9; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px;">
          <span style="font-size: 11px; text-transform: uppercase; font-weight: bold; color: #64748b;">Target Position</span>
          <h3 style="margin: 2px 0 0 0; color: #0B2553; font-size: 16px;">${data.jobTitle}</h3>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 130px; font-weight: bold;">Candidate:</td>
            <td style="padding: 8px 0; color: #0B2553; font-size: 14px; font-weight: 600;">${data.candidateName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0; color: #0C487A; font-size: 14px;"><a href="mailto:${data.candidateEmail}">${data.candidateEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: bold;">Phone:</td>
            <td style="padding: 8px 0; color: #0B2553; font-size: 14px;"><a href="tel:${data.candidatePhone}">${data.candidatePhone}</a></td>
          </tr>
        </table>

        <div style="margin-bottom: 24px; text-align: center;">
          <a href="${data.resumeUrl}" target="_blank" style="display: inline-block; background-color: #FF3130; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: bold;">Download Candidate Resume</a>
        </div>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; text-align: center;">
          <a href="https://unitycompass.com/admin" style="color: #64748b; text-decoration: underline; font-size: 12px;">Manage Applications in Admin Portal</a>
        </div>
      </div>
    `,
  });
}
