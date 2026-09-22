import { useTilt } from '../hooks/useTilt';

export default function TiltCard({
  children,
  className = '',
  maxTilt = 7,
  global = false,
  shine = false,
  ...props
}) {
  const { ref, transform } = useTilt({ maxTilt, global });

  return (
    <div
      ref={ref}
      data-tilt
      className={`tilt-3d ${shine ? 'tilt-3d-shine' : ''} ${className}`}
      style={{ transform }}
      {...props}
    >
      {children}
    </div>
  );
}