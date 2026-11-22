export const prerender = false;

import type { APIRoute } from 'astro';
import { supabaseAdmin, isSupabaseConfigured } from '../../../lib/supabase';

// Default curated image gallery for GovCon articles
const DEFAULT_MEDIA_LIBRARY = [
  { name: 'blog-1-growth.jpg', url: 'https://papgpunctttqnlttycdd.supabase.co/storage/v1/object/public/blog-images/blog-1-growth.jpg' },
  { name: 'blog-2-proposals.jpg', url: 'https://papgpunctttqnlttycdd.supabase.co/storage/v1/object/public/blog-images/blog-2-proposals.jpg' },
  { name: 'blog-3-infrastructure.jpg', url: 'https://papgpunctttqnlttycdd.supabase.co/storage/v1/object/public/blog-images/blog-3-infrastructure.jpg' },
  { name: 'blog-4-consulting.jpg', url: 'https://papgpunctttqnlttycdd.supabase.co/storage/v1/object/public/blog-images/blog-4-consulting.jpg' },
  { name: 'blog-5-cybersecurity.jpg', url: 'https://papgpunctttqnlttycdd.supabase.co/storage/v1/object/public/blog-images/blog-5-cybersecurity.jpg' },
  { name: 'blog-6-year-in-review.jpg', url: 'https://papgpunctttqnlttycdd.supabase.co/storage/v1/object/public/blog-images/blog-6-year-in-review.jpg' },
];

export const GET: APIRoute = async () => {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return new Response(
      JSON.stringify({ images: DEFAULT_MEDIA_LIBRARY }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { data, error } = await supabaseAdmin.storage
      .from('blog-images')
      .list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

    if (error) throw error;

    const uploaded = (data || [])
      .filter((file) => file.name && !file.name.startsWith('.'))
      .map((file) => {
        const { data: pub } = supabaseAdmin!.storage
          .from('blog-images')
          .getPublicUrl(file.name);
        return {
          name: file.name,
          url: pub.publicUrl,
          created_at: file.created_at,
        };
      });

    // Merge uploaded with defaults (deduplicating by URL)
    const combined = [...uploaded];
    DEFAULT_MEDIA_LIBRARY.forEach((def) => {
      if (!combined.some((item) => item.url === def.url || item.name === def.name)) {
        combined.push(def);
      }
    });

    return new Response(
      JSON.stringify({ images: combined }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ images: DEFAULT_MEDIA_LIBRARY }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return new Response(
      JSON.stringify({ error: 'Supabase storage is not configured.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No image file provided in request.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate safe clean filename with timestamp
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const cleanBase = file.name
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-');
    const filename = `${cleanBase}-${Date.now()}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data: uploadData, error: uploadErr } = await supabaseAdmin.storage
      .from('blog-images')
      .upload(filename, buffer, {
        contentType: file.type || 'image/jpeg',
        upsert: true,
      });

    if (uploadErr) {
      throw uploadErr;
    }

    const { data: publicData } = supabaseAdmin.storage
      .from('blog-images')
      .getPublicUrl(filename);

    return new Response(
      JSON.stringify({
        success: true,
        url: publicData.publicUrl,
        filename,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Image upload failed:', err);
    return new Response(
      JSON.stringify({ error: err.message || 'Image upload failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

