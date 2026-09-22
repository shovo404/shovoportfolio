import { useContent } from '../context/ContentContext';

// Legacy convenience hooks — all real values now live in the `site_content`
// Supabase table (editable from the admin panel) with defaults in
// src/data/defaults.js. New code should call useContent() directly.

export function useProfile() {
  const content = useContent();
  return content?.profile;
}

export function useSocialLinks() {
  const content = useContent();
  return content?.socialLinks;
}

export function useQuickLinks() {
  const content = useContent();
  return content?.quickLinks;
}
