import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  const alignClass = align === 'center' ? 'mx-auto text-center items-center' : 'items-start';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7 }}
      className={`mb-10 flex max-w-3xl flex-col gap-3 ${alignClass}`}
    >
      <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/80">
        {eyebrow}
      </span>
      <h2 className="section-title text-balance">{title}</h2>
      <p className="section-subtitle">{subtitle}</p>
    </motion.div>
  );
}
