-- ============================================================
-- Portfolio admin: Supabase schema + storage
-- Run this in: Supabase Dashboard -> SQL Editor -> New query
-- SAFE TO RUN MORE THAN ONCE (all statements are idempotent).
-- Creates: projects table, site_content table (all editable page
-- content), the PUBLIC "project-images" storage bucket, and the
-- storage.objects RLS policies used by image uploads.
-- NOTE: table/storage ACLs are enforced by policies, so any
-- logged-in admin can upload via the admin panel.
-- ============================================================

-- ---------- Projects table ----------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  tech text[] not null default '{}',
  image_url text,
  github_url text,
  live_url text,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

-- Visitors can read projects
drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects"
  on public.projects for select
  using (true);

-- Only logged-in admins can write
drop policy if exists "Admins can insert projects" on public.projects;
create policy "Admins can insert projects"
  on public.projects for insert
  with check (auth.role() = 'authenticated');

drop policy if exists "Admins can update projects" on public.projects;
create policy "Admins can update projects"
  on public.projects for update
  using (auth.role() = 'authenticated');

drop policy if exists "Admins can delete projects" on public.projects;
create policy "Admins can delete projects"
  on public.projects for delete
  using (auth.role() = 'authenticated');

-- ---------- Editable site content (single JSON row) ----------
create table if not exists public.site_content (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
  on public.site_content for select
  using (true);

drop policy if exists "Admins can insert site content" on public.site_content;
create policy "Admins can insert site content"
  on public.site_content for insert
  with check (auth.role() = 'authenticated');

drop policy if exists "Admins can update site content" on public.site_content;
create policy "Admins can update site content"
  on public.site_content for update
  using (auth.role() = 'authenticated');

-- ---------- Image storage bucket (PUBLIC) ----------
-- Creates the bucket if missing; if it already exists, re-asserts
-- public access and the upload constraints (keeps it re-runnable).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-images',
  'project-images',
  true,
  10485760,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif']::text[]
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

-- ---------- storage.objects RLS policies ----------
-- Public read: anyone can view project images.
-- Authenticated: only logged-in admins can upload/replace/delete.

drop policy if exists "Public can read project images" on storage.objects;
create policy "Public can read project images"
  on storage.objects for select
  using (bucket_id = 'project-images');

drop policy if exists "Admins can upload project images" on storage.objects;
create policy "Admins can upload project images"
  on storage.objects for insert
  with check (bucket_id = 'project-images' and auth.role() = 'authenticated');

drop policy if exists "Admins can update project images" on storage.objects;
create policy "Admins can update project images"
  on storage.objects for update
  using (bucket_id = 'project-images' and auth.role() = 'authenticated')
  with check (bucket_id = 'project-images' and auth.role() = 'authenticated');

drop policy if exists "Admins can delete project images" on storage.objects;
create policy "Admins can delete project images"
  on storage.objects for delete
  using (bucket_id = 'project-images' and auth.role() = 'authenticated');