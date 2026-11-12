export const prerender = false;

import type { APIRoute } from 'astro';
import { supabaseAdmin, isSupabaseConfigured } from '../../../lib/supabase';

export const GET: APIRoute = async () => {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    // Return sample/mock data if Supabase is not yet connected
    return new Response(
      JSON.stringify({
        mocked: true,
        inquiries: [
          {
            id: 'mock-1',
            name: 'Robert Vance',
            email: 'rvance@defensecontracting.com',
            phone: '+1 (703) 555-0144',
            message: 'Pursuing an upcoming OASIS+ task order for US Navy NAVAIR. Looking for cleared proposal development support.',
            status: 'new',
            created_at: new Date().toISOString(),
          },
          {
            id: 'mock-2',
            name: 'Sarah Jenkins',
            email: 'sjenkins@apextech.gov',
            phone: '+1 (301) 555-0182',
            message: 'Inquiring about security-cleared DevOps engineers with active TS/SCI for Fort Meade program.',
            status: 'in_review',
            created_at: new Date(Date.now() - 86400000).toISOString(),
          },
        ],
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('contact_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return new Response(
      JSON.stringify({ inquiries: data || [] }),
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

    if (!id || !status) {
      return new Response(
        JSON.stringify({ error: 'ID and status are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { error } = await supabaseAdmin
      .from('contact_inquiries')
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

