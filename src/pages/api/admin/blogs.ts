export const prerender = false;

import type { APIRoute } from 'astro';
import { supabaseAdmin, isSupabaseConfigured } from '../../../lib/supabase';
import { blogPosts as fallbackPosts } from '../../../data/blogPosts';

export const GET: APIRoute = async () => {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return new Response(
      JSON.stringify({ blogs: fallbackPosts, mocked: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return new Response(
      JSON.stringify({ blogs: data || [] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return new Response(
      JSON.stringify({ success: true, mocked: true, message: 'Blog created in mock mode.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.json();
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const { data, error } = await supabaseAdmin
      .from('blogs')
      .insert({
        slug,
        title: body.title,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        author: body.author || 'Unity Compass Team',
        read_time: body.readTime || '5 min read',
        category: body.category || 'GovCon Advisory',
        excerpt: body.excerpt,
        image: body.image || '/images/ChatGPT-Image-Feb-12-2026-03_22_39-PM.png',
        content_blocks: body.contentBlocks || [],
        is_published: true,
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, blog: data }),
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
    const { id, is_published } = body;

    const { error } = await supabaseAdmin
      .from('blogs')
      .update({ is_published })
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

