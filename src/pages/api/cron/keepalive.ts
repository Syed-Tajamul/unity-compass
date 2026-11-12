export const prerender = false;

import type { APIRoute } from 'astro';
import { supabaseAdmin, isSupabaseConfigured } from '../../../lib/supabase';

/**
 * Keep-Alive Cron Endpoint
 * 
 * Prevents Supabase Free-Tier projects from pausing due to 7-day inactivity.
 * Triggered automatically by GitHub Actions or Vercel Cron.
 */
export const GET: APIRoute = async () => {
  const timestamp = new Date().toISOString();

  if (!isSupabaseConfigured || !supabaseAdmin) {
    return new Response(
      JSON.stringify({
        status: 'mock_alive',
        message: 'Supabase is not configured yet. Set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY.',
        timestamp,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Perform a lightweight query on Supabase DB to reset the inactivity timer
    const { data, error } = await supabaseAdmin
      .from('jobs')
      .select('id')
      .limit(1);

    if (error) {
      console.error('[Supabase Keep-Alive Ping Failed]:', error);
      return new Response(
        JSON.stringify({ status: 'error', error: error.message, timestamp }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        status: 'alive',
        message: 'Supabase database query succeeded. Inactivity timer reset.',
        recordsFound: data?.length || 0,
        timestamp,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[Supabase Keep-Alive Uncaught Error]:', err);
    return new Response(
      JSON.stringify({ status: 'error', error: err?.message || 'Unknown error', timestamp }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

