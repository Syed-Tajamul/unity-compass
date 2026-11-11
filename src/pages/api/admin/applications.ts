export const prerender = false;

import type { APIRoute } from 'astro';
import { supabaseAdmin, isSupabaseConfigured } from '../../../lib/supabase';

export const GET: APIRoute = async () => {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return new Response(
      JSON.stringify({
        mocked: true,
        applications: [
          {
            id: 'mock-app-1',
            job_title: 'Senior Cleared Cloud Architect',
            candidate_name: 'Marcus Brody',
            candidate_email: 'mbrody@defensecloud.io',
            candidate_phone: '+1 (703) 555-0199',
            resume_url: '#',
            status: 'submitted',
            created_at: new Date().toISOString(),
          },
          {
            id: 'mock-app-2',
            job_title: 'Cleared Cyber Security Analyst (Threat Hunt)',
            candidate_name: 'Elena Rostova',
            candidate_email: 'erostova@security.org',
            candidate_phone: '+1 (410) 555-0123',
            resume_url: '#',
            status: 'reviewed',
            created_at: new Date(Date.now() - 172800000).toISOString(),
          },
        ],
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return new Response(
      JSON.stringify({ applications: data || [] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const PATCH: APIRoute = async ({ request }) => {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return new Response(
      JSON.stringify({ success: true, mocked: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    const { error } = await supabaseAdmin
      .from('job_applications')
      .update({ status })
      .eq('id', id);

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

