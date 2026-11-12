export const prerender = false;

import type { APIRoute } from 'astro';
import { supabaseAdmin, isSupabaseConfigured } from '../../../lib/supabase';
import { sendJobApplicationNotification } from '../../../lib/email';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = (formData.get('name') as string)?.trim() || '';
    const email = (formData.get('email') as string)?.trim() || '';
    const phone = (formData.get('phone') as string)?.trim() || '';
    const jobTitle = (formData.get('jobTitle') as string)?.trim() || 'General Talent Network';
    const jobId = (formData.get('jobId') as string)?.trim() || null;
    const file = formData.get('resume') as File | null;

    if (!name || !email || !phone) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and phone are required candidate fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!file || !(file instanceof File) || file.size === 0) {
      return new Response(
        JSON.stringify({ error: 'Please upload your resume document.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 5MB max size check
    const maxBytes = 5 * 1024 * 1024;
    if (file.size > maxBytes) {
      return new Response(
        JSON.stringify({ error: 'Resume file size exceeds the 5MB limit. Please upload a smaller PDF or Word document.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Allowed extensions check
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileName = file.name.toLowerCase();
    const isValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
    if (!isValidExtension) {
      return new Response(
        JSON.stringify({ error: 'Invalid document type. Only PDF, DOC, and DOCX files are accepted.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let resumeUrl = 'https://unitycompass.com/mock-resume-path.pdf';

    // 1. Upload to Supabase Storage if configured
    if (isSupabaseConfigured && supabaseAdmin) {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const storagePath = `resumes/${Date.now()}_${sanitizedName}`;
      const fileBuffer = await file.arrayBuffer();

      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from('resumes')
        .upload(storagePath, fileBuffer, {
          contentType: file.type || 'application/pdf',
          upsert: true,
        });

      if (uploadError) {
        console.error('[Supabase Storage Upload Error]:', uploadError);
        return new Response(
          JSON.stringify({ error: 'Failed to upload resume file to storage. Please try again.' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Generate signed URL valid for 30 days for admin review
      const { data: signedData } = await supabaseAdmin.storage
        .from('resumes')
        .createSignedUrl(storagePath, 60 * 60 * 24 * 30);

      resumeUrl = signedData?.signedUrl || uploadData?.path || storagePath;

      // 2. Insert into job_applications table
      const { error: dbError } = await supabaseAdmin
        .from('job_applications')
        .insert({
          job_id: jobId,
          job_title: jobTitle,
          candidate_name: name,
          candidate_email: email,
          candidate_phone: phone,
          resume_url: resumeUrl,
          status: 'submitted',
        });

      if (dbError) {
        console.error('[Supabase DB Application Error]:', dbError);
      }
    } else {
      console.log('[Careers API (Mock Mode)] Application received for:', name, 'Job:', jobTitle);
    }

    // 3. Dispatch notification email to admin via Resend
    await sendJobApplicationNotification({
      candidateName: name,
      candidateEmail: email,
      candidatePhone: phone,
      jobTitle,
      resumeUrl,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your application has been received successfully! Our talent acquisition team will review your qualifications.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[Careers Apply API Error]:', err);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred while processing your application.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

