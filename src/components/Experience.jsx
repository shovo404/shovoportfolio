import { motion } from 'framer-motion';
import { FiBriefcase, FiUsers } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { useContent } from '../context/ContentContext';
import TiltCard from './TiltCard';

export default function Experience() {
  const content = useContent();
  const experience = content?.experience || [];
  const memberships = content?.memberships || [];

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Professional exposure and community involvement."
          subtitle="This section combines formal experience with the clubs and labs that shaped the development journey."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {experience.map((item) => (
            <TiltCard key={item.role} maxTilt={6} className="h-full">
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7 }}
                className="glass card-hover rounded-[28px] p-7 h-full"
              >
                <div className="mb-4 inline-flex rounded-full border border-cyan-400/15 bg-white/5 p-3 text-cyan-200">
                  <FiBriefcase />
                </div>
                <h3 className="text-2xl font-semibold text-white">{item.role}</h3>
                <p className="mt-1 text-sm text-slate-400">{item.company}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.3em] text-cyan-200/70">{item.timeline}</p>
                <p className="mt-4 text-slate-300">{item.summary}</p>
              </motion.article>
            </TiltCard>
          ))}

          <TiltCard maxTilt={6} className="h-full">
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="glass card-hover rounded-[28px] p-7 h-full"
            >
              <div className="mb-4 inline-flex rounded-full border border-cyan-400/15 bg-white/5 p-3 text-cyan-200">
                <FiUsers />
              </div>
              <h3 className="text-2xl font-semibold text-white">Clubs &amp; memberships</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {memberships.map((club) => (
                  <span key={club} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                    {club}
                  </span>
                ))}
              </div>
            </motion.article>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
