export const prerender = false;

import type { APIRoute } from 'astro';
import { supabaseAdmin, isSupabaseConfigured } from '../../lib/supabase';
import { sendContactNotification } from '../../lib/email';

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    let name = '';
    let email = '';
    let phone = '';
    let message = '';

    if (contentType.includes('application/json')) {
      const body = await request.json();
      name = body.name?.trim() || '';
      email = body.email?.trim() || '';
      phone = body.phone?.trim() || '';
      message = body.message?.trim() || '';
    } else {
      const formData = await request.formData();
      name = (formData.get('name') as string)?.trim() || '';
      email = (formData.get('email') as string)?.trim() || '';
      phone = (formData.get('phone') as string)?.trim() || '';
      message = (formData.get('message') as string)?.trim() || '';
    }

    if (!name || !email || !phone || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address provided.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let insertedId: string | null = null;

    // 1. Insert into Supabase if configured
    if (isSupabaseConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('contact_inquiries')
        .insert({
          name,
          email,
          phone,
          message,
          status: 'new',
        })
        .select('id')
        .single();

      if (error) {
        console.error('[Supabase Contact Error]:', error);
      } else {
        insertedId = data?.id;
      }
    } else {
      console.log('[Contact API (Mock Mode)] Submission received for:', email);
    }

    // 2. Dispatch email notification to admin via Resend
    await sendContactNotification({
      name,
      email,
      phone,
      message,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your message has been received successfully. A GovCon advisor will follow up within 24 hours.',
        id: insertedId,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[Contact API Uncaught Error]:', err);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred while processing your request.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

