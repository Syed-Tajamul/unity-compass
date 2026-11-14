export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const email = (body.email || '').trim().toLowerCase();
    const password = (body.password || '').trim();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const envEmail = (import.meta.env.ADMIN_EMAIL || 'syedtawseef0@gmail.com').toLowerCase();
    const envPasskey = import.meta.env.ADMIN_PASSKEY || 'admin123';

    // Authorized admin credentials
    const validEmails = [envEmail, 'admin@unitycompass.com', 'syedtawseef0@gmail.com'];
    const validPasswords = [envPasskey, 'admin123', 'unitycompass2026'];

    if (validEmails.includes(email) && validPasswords.includes(password)) {
      return new Response(
        JSON.stringify({
          success: true,
          token: 'uc_admin_session_auth_v1',
          user: {
            name: 'Syed Tawseef',
            email: email,
            role: 'Administrator',
          },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid admin credentials. Access is restricted to authorized administrators only.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Authentication service error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

