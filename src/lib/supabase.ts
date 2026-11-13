/**
 * supabase.ts - Supabase Client & Admin Client Instance
 * 
 * Provides:
 * - `supabase`: Standard client for public queries (safe with Anon key)
 * - `supabaseAdmin`: Elevated client with Service Role Key for server-side operations
 *   (bypasses RLS, reads private resume storage, updates status)
 * - Graceful fallback mode if environment variables are not yet configured.
 */
import { createClient } from '@supabase/supabase-js';

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

const supabaseUrl = getEnv('PUBLIC_SUPABASE_URL');
const supabaseAnonKey = getEnv('PUBLIC_SUPABASE_ANON_KEY');
const supabaseServiceKey = getEnv('SUPABASE_SERVICE_ROLE_KEY') || supabaseAnonKey;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder')
);

// Public / Client-safe Supabase Instance
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true },
    })
  : null;

// Server-side Elevated Supabase Admin Instance
export const supabaseAdmin = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    })
  : null;

