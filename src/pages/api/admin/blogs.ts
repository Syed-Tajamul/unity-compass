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
        date: body.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        author: body.author || 'Unity Compass Team',
        read_time: body.readTime || '5 min read',
        category: body.category || 'GovCon Advisory',
        excerpt: body.excerpt || '',
        image: body.image || 'https://papgpunctttqnlttycdd.supabase.co/storage/v1/object/public/blog-images/blog-1-growth.jpg',
        gallery_images: body.galleryImages || [],
        related_slugs: body.relatedSlugs || [],
        content_blocks: body.contentBlocks || [],
        is_published: body.isPublished !== undefined ? body.isPublished : true,
        metadata: body.metadata || {},
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

export const PUT: APIRoute = async ({ request }) => {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return new Response(
      JSON.stringify({ success: true, mocked: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'Missing blog ID for update' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const updatePayload: Record<string, any> = {};
    if (updates.title) updatePayload.title = updates.title;
    if (updates.slug) updatePayload.slug = updates.slug;
    if (updates.category) updatePayload.category = updates.category;
    if (updates.author) updatePayload.author = updates.author;
    if (updates.readTime) updatePayload.read_time = updates.readTime;
    if (updates.excerpt !== undefined) updatePayload.excerpt = updates.excerpt;
    if (updates.image) updatePayload.image = updates.image;
    if (updates.galleryImages) updatePayload.gallery_images = updates.galleryImages;
    if (updates.relatedSlugs) updatePayload.related_slugs = updates.relatedSlugs;
    if (updates.contentBlocks) updatePayload.content_blocks = updates.contentBlocks;
    if (updates.isPublished !== undefined) updatePayload.is_published = updates.isPublished;
    if (updates.metadata) updatePayload.metadata = updates.metadata;

    const { data, error } = await supabaseAdmin
      .from('blogs')
      .update(updatePayload)
      .eq('id', id)
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

export const DELETE: APIRoute = async ({ request }) => {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return new Response(
      JSON.stringify({ success: true, mocked: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'Missing blog ID for deletion' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { error } = await supabaseAdmin
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, message: 'Blog deleted successfully.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
