import { supabase } from './supabase';

export async function fetchSiteContent() {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('site_content')
    .select('data')
    .eq('id', 1)
    .maybeSingle();

  if (error) {
    console.error('Failed to load site content:', error.message);
    return null;
  }

  return data?.data || null;
}

export async function saveSiteContent(content) {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { error } = await supabase
    .from('site_content')
    .upsert({ id: 1, data: content, updated_at: new Date().toISOString() });

  if (error) throw error;
}
