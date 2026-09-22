import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useContent } from '../context/ContentContext';

function Counter({ value, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const target = Number(value);
    if (!target || Number.isNaN(target)) return;
    let current = 0;
    const duration = 1200;
    const step = Math.max(1, Math.floor(duration / target));

    const timer = window.setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= target) window.clearInterval(timer);
    }, step);

    return () => window.clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="glass rounded-3xl border border-white/10 p-5 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="text-4xl font-semibold tracking-[-0.04em] text-white">{count}+</div>
        <p className="mt-2 text-sm text-slate-400">{label}</p>
      </motion.div>
    </div>
  );
}

export default function AnimatedCounters() {
  const content = useContent();
  const stats = content?.stats || [];

  return (
    <section className="section">
      <div className="container grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Counter key={item.label} {...item} />
        ))}
      </div>
    </section>
  );
}
