-- ============================================================
-- Portfolio admin: Supabase schema
-- Run this once in: Supabase Dashboard -> SQL Editor -> New query
-- Then create your admin user via 'Add new user' in Authentication.
-- Creates: projects table, site_content table (all editable page content),
-- and the project-images storage bucket.
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
create policy "Public can read projects"
  on public.projects for select
  using (true);

-- Only logged-in admins can write
create policy "Admins can insert projects"
  on public.projects for insert
  with check (auth.role() = 'authenticated');

create policy "Admins can update projects"
  on public.projects for update
  using (auth.role() = 'authenticated');

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

create policy "Public can read site content"
  on public.site_content for select
  using (true);

create policy "Admins can insert site content"
  on public.site_content for insert
  with check (auth.role() = 'authenticated');

create policy "Admins can update site content"
  on public.site_content for update
  using (auth.role() = 'authenticated');

-- ---------- Image storage bucket ----------
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

create policy "Public can read project images"
  on storage.objects for select
  using (bucket_id = 'project-images');

create policy "Admins can upload project images"
  on storage.objects for insert
  with check (bucket_id = 'project-images' and auth.role() = 'authenticated');

create policy "Admins can update project images"
  on storage.objects for update
  using (bucket_id = 'project-images' and auth.role() = 'authenticated');

create policy "Admins can delete project images"
  on storage.objects for delete
  using (bucket_id = 'project-images' and auth.role() = 'authenticated');