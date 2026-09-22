import { useCallback, useEffect, useRef, useState } from 'react';

const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useTilt({ maxTilt = 8, global = false, disabled = false } = {}) {
  const ref = useRef(null);
  const [transform, setTransform] = useState(
    'perspective(1100px) rotateX(0deg) rotateY(0deg)',
  );

  const handleMove = useCallback(
    (event) => {
      const element = ref.current;
      if (!element) return;

      const clientX = global ? event.clientX : event.clientX;
      const clientY = global ? event.clientY : event.clientY;
      const rect = element.getBoundingClientRect();

      const px = (clientX - rect.left) / rect.width;
      const py = (clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * maxTilt;
      const ry = (px - 0.5) * maxTilt;

      setTransform(
        `perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`,
      );
    },
    [global, maxTilt],
  );

  const handleLeave = useCallback(() => {
    setTransform('perspective(1100px) rotateX(0deg) rotateY(0deg)');
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element || disabled || REDUCED_MOTION) return undefined;

    if (global) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseleave', handleLeave);
      return () => {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseleave', handleLeave);
      };
    }

    element.addEventListener('mousemove', handleMove);
    element.addEventListener('mouseleave', handleLeave);
    return () => {
      element.removeEventListener('mousemove', handleMove);
      element.removeEventListener('mouseleave', handleLeave);
    };
  }, [global, disabled, handleMove, handleLeave]);

  return { ref, transform };
}