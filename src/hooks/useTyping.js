import { useEffect, useState } from 'react';

export function useTyping(words, speed = 70, pause = 1400) {
  const [index, setIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const timeout = setTimeout(() => {
      if (!deleting && charCount < current.length) {
        setCharCount((value) => value + 1);
      } else if (!deleting && charCount === current.length) {
        setTimeout(() => setDeleting(true), pause);
      } else if (deleting && charCount > 0) {
        setCharCount((value) => value - 1);
      } else if (deleting && charCount === 0) {
        setDeleting(false);
        setIndex((value) => value + 1);
      }
    }, deleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [charCount, deleting, index, pause, speed, words]);

  return words[index % words.length].slice(0, charCount);
}
