import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { useContent } from '../context/ContentContext';
import TiltCard from './TiltCard';

export default function EducationTimeline() {
  const content = useContent();
  const education = content?.education || [];

  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Education"
          title="A timeline shaped by technical growth and academic progression."
          subtitle="The vertical timeline keeps the story clean and recruiter-friendly while still feeling cinematic."
        />

        <div className="timeline max-w-3xl">
          {education.map((item, index) => (
            <TiltCard key={item.title} maxTilt={6}>
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="timeline-item glass card-hover rounded-[24px] p-6"
              >
                <div className="mb-2 text-sm uppercase tracking-[0.28em] text-cyan-200/80">{item.year}</div>
                <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{item.institution}</p>
                <p className="mt-4 text-slate-300">{item.description}</p>
              </motion.article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
