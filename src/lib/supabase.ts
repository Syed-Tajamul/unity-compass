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

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder'));

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

