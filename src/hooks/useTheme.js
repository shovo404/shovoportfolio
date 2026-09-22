import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme] = useState('dark');

  useEffect(() => {
    document.documentElement.dataset.theme = 'dark';
  }, [theme]);

  return { theme };
}
