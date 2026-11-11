-- =========================================================================
-- UNITY COMPASS - COMPLETE SUPABASE DATABASE & STORAGE SCHEMA
-- Run this script in the Supabase SQL Editor (Dashboard > SQL Editor)
-- =========================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================================
-- 2. CONTACT INQUIRIES TABLE
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'replied', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast status & date sorting
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON public.contact_inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_status ON public.contact_inquiries (status);

-- Enable RLS
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous users to insert contact messages
CREATE POLICY "Public can submit contact inquiries"
    ON public.contact_inquiries
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Allow authenticated admins to view and manage inquiries
CREATE POLICY "Admins have full access to contact inquiries"
    ON public.contact_inquiries
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);


-- =========================================================================
-- 3. JOBS / CAREERS TABLE
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.jobs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    workplace_type TEXT NOT NULL DEFAULT 'Hybrid',
    employment_type TEXT NOT NULL DEFAULT 'Full-Time',
    clearance_level TEXT NOT NULL DEFAULT 'None',
    description TEXT NOT NULL,
    requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
    responsibilities JSONB NOT NULL DEFAULT '[]'::jsonb,
    posted_date TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_jobs_active ON public.jobs (is_active, created_at DESC);

-- Enable RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Public can view active jobs
CREATE POLICY "Public can view active jobs"
    ON public.jobs
    FOR SELECT
    TO public
    USING (is_active = true);

-- Admins have full access to jobs
CREATE POLICY "Admins have full access to jobs"
    ON public.jobs
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);


-- =========================================================================
-- 4. JOB APPLICATIONS & RESUMES TABLE
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id TEXT REFERENCES public.jobs(id) ON DELETE SET NULL,
    job_title TEXT NOT NULL,
    candidate_name TEXT NOT NULL,
    candidate_email TEXT NOT NULL,
    candidate_phone TEXT NOT NULL,
    resume_url TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewed', 'shortlisted', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_applications_job ON public.job_applications (job_id, created_at DESC);

-- Enable RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Public can submit applications
CREATE POLICY "Public can submit applications"
    ON public.job_applications
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Admins have full access to applications
CREATE POLICY "Admins have full access to applications"
    ON public.job_applications
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);


-- =========================================================================
-- 5. BLOGS / ARTICLES TABLE
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'Unity Compass Team',
    read_time TEXT NOT NULL DEFAULT '5 min read',
    category TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    image TEXT NOT NULL,
    content_blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs (slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON public.blogs (is_published, created_at DESC);

-- Enable RLS
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Public can view published blogs
CREATE POLICY "Public can view published blogs"
    ON public.blogs
    FOR SELECT
    TO public
    USING (is_published = true);

-- Admins have full access to blogs
CREATE POLICY "Admins have full access to blogs"
    ON public.blogs
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);


-- =========================================================================
-- 6. STORAGE BUCKETS SETUP
-- =========================================================================
-- Insert 'resumes' bucket (private for candidate documents)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'resumes',
    'resumes',
    false,
    5242880, -- 5 MB
    ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
) ON CONFLICT (id) DO NOTHING;

-- Insert 'blog-images' bucket (public for article hero images)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'blog-images',
    'blog-images',
    true,
    5242880, -- 5 MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
) ON CONFLICT (id) DO NOTHING;

-- Storage Policies for Resumes
CREATE POLICY "Anyone can upload a resume"
    ON storage.objects
    FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Admins can read resumes"
    ON storage.objects
    FOR SELECT
    TO authenticated
    USING (bucket_id = 'resumes');

-- Storage Policies for Blog Images
CREATE POLICY "Public can read blog images"
    ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'blog-images');

CREATE POLICY "Admins can upload blog images"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'blog-images');


-- =========================================================================
-- 7. INITIAL SEED DATA (CORE JOBS)
-- =========================================================================
INSERT INTO public.jobs (id, title, department, location, workplace_type, employment_type, clearance_level, description, requirements, responsibilities, posted_date, is_active)
VALUES
(
    'uc-job-101',
    'Senior Cleared Cloud Architect',
    'Federal IT & Cloud Engineering',
    'Reston, VA / Washington, DC',
    'Hybrid',
    'Full-Time',
    'TS/SCI with Polygraph',
    'Lead secure cloud migrations and infrastructure architecture for national defense and intelligence community programs.',
    '["Active TS/SCI with CI or Full Scope Polygraph", "8+ years cloud engineering experience with AWS GovCloud or Azure Government", "DoD 8570/8140 IAM Level II or III certification (CISSP, CCSP, or CISM)", "Experience with Infrastructure as Code (Terraform, Ansible)"]'::jsonb,
    '["Design multi-tenant cloud solutions compliant with FedRAMP High and DoD IL5/IL6", "Collaborate with agency security officers on ATO (Authority to Operate) documentation", "Mentor engineering teams in zero-trust architecture principles"]'::jsonb,
    'February 2026',
    true
),
(
    'uc-job-102',
    'Federal Capture & Proposal Manager',
    'Proposal Development & Capture',
    'Frederick, MD / Washington, DC',
    'Hybrid',
    'Full-Time',
    'Public Trust',
    'Drive end-to-end capture and compliant proposal execution across DoD, Civilian, and GSA OASIS+ solicitations.',
    '["5+ years federal proposal management experience with documented $20M+ win record", "Deep mastery of FAR, DFARS, Section L & M evaluation criteria, and Shipley methodology", "Bachelor’s degree in English, Journalism, Business, or technical discipline"]'::jsonb,
    '["Lead color team reviews (Pink, Red, Gold Team) ensuring strict compliance with RFP instructions", "Develop Executive Summaries, win themes, and compliance matrices", "Manage multidisciplinary volume leads and SME contributors under tight deadlines"]'::jsonb,
    'February 2026',
    true
),
(
    'uc-job-103',
    'Cleared Cyber Security Analyst (Threat Hunt)',
    'Defense Cybersecurity & Threat Intel',
    'Fort Meade, MD / Columbia, MD',
    'On-site',
    'Contract',
    'Top Secret / SCI',
    'Execute real-time threat hunting, SIEM log analysis, and incident mitigation for critical defense networks.',
    '["Active Top Secret / SCI clearance", "4+ years SOC or Threat Hunting experience in DoD or federal civilian environments", "Security+ CE, CySA+, or CEH certification", "Hands-on expertise with Splunk, Elastic, Sentinel, and CrowdStrike Falcon"]'::jsonb,
    '["Detect, investigate, and remediate advanced persistent threat (APT) indicators", "Author incident post-mortems and present actionable mitigation plans to government task leads", "Maintain continuous compliance with DISA STIGs and NIST SP 800-53"]'::jsonb,
    'February 2026',
    true
)
ON CONFLICT (id) DO NOTHING;

