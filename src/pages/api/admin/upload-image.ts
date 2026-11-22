export const prerender = false;

import type { APIRoute } from 'astro';
import { supabaseAdmin, isSupabaseConfigured } from '../../../lib/supabase';

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
