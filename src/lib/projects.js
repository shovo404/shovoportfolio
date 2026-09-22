import { supabase } from './supabase';

export async function fetchProjects() {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to load projects:', error.message);
    return null;
  }

  return data;
}

export async function createProject(payload) {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { data, error } = await supabase
    .from('projects')
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProject(id, payload) {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { data, error } = await supabase
    .from('projects')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProject(id) {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}

export async function uploadProjectImage(file, oldPath) {
  if (!supabase) throw new Error('Supabase is not configured.');

  const extension = file.name.split('.').pop() || 'jpg';
  const path = `projects/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from('project-images')
    .upload(path, file, { cacheControl: '3600', upsert: false });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from('project-images').getPublicUrl(path);

  if (oldPath) {
    await removeProjectImage(oldPath);
  }

  return data.publicUrl;
}

export async function removeProjectImage(publicUrl) {
  if (!supabase || !publicUrl) return;

  const bucketBase = `${supabase.storage.from('project-images').getPublicUrl('x').data.publicUrl.replace(/x$/, '')}`;
  const fileName = publicUrl.replace(bucketBase, '');
  if (!fileName || fileName === publicUrl) return;

  await supabase.storage.from('project-images').remove([fileName]);
}