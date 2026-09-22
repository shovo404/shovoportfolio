import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchSiteContent } from '../lib/content';
import { isSupabaseConfigured } from '../lib/supabase';
import { DEFAULT_CONTENT, mergeContent } from '../data/defaults';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    let cancelled = false;

    // Show defaults immediately so the page renders instantly; live values
    // replace them once fetched.
    setContent(mergeContent(null));

    if (!isSupabaseConfigured) return undefined;

    fetchSiteContent().then((data) => {
      if (!cancelled && data) setContent(mergeContent(data));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => content, [content]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}
