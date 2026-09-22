import { STORAGE_BUCKET, supabase } from './supabase';

export async function uploadImage(file, folder = 'hero') {
  if (!supabase) throw new Error('Supabase is not configured.');

  const extension = file.name.split('.').pop() || 'jpg';
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadNewImage(file, folder = 'hero', oldUrl) {
  const url = await uploadImage(file, folder);
  if (oldUrl) await deleteImage(oldUrl);
  return url;
}

export async function deleteImage(publicUrl) {
  if (!supabase || !publicUrl) return;

  const bucketBase = `${supabase.storage.from(STORAGE_BUCKET).getPublicUrl('x').data.publicUrl.replace(/x$/, '')}`;
  const fileName = publicUrl.replace(bucketBase, '');
  if (!fileName || fileName === publicUrl) return;

  await supabase.storage.from(STORAGE_BUCKET).remove([fileName]);
}