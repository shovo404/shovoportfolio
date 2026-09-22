export default function FloatingParticles() {
  const particles = [
    { left: '6%', top: '15%', delay: '0s', size: '10px' },
    { left: '14%', top: '70%', delay: '2s', size: '14px' },
    { left: '33%', top: '22%', delay: '4s', size: '8px' },
    { left: '52%', top: '12%', delay: '1s', size: '12px' },
    { left: '68%', top: '78%', delay: '5s', size: '9px' },
    { left: '82%', top: '24%', delay: '3s', size: '16px' },
    { left: '91%', top: '56%', delay: '6s', size: '11px' },
  ];

  return (
    <div className="floating-icons" aria-hidden="true">
      {particles.map((particle, index) => (
        <span
          key={index}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
