import { motion } from 'framer-motion';
import { FiBookOpen, FiFileText, FiAward } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { useContent } from '../context/ContentContext';
import TiltCard from './TiltCard';

export default function Research() {
  const content = useContent();
  const research = content?.research || {};

  return (
    <section id="research" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Research"
          title="Thesis and publication work presented with a journal-style rhythm."
          subtitle="The section emphasizes credibility with polished cards, strong hierarchy, and a premium editorial feel."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <TiltCard maxTilt={6} className="h-full">
          <motion.article
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="glass card-hover rounded-[28px] p-7 md:p-8 h-full"
          >
            <div className="mb-4 inline-flex rounded-full border border-cyan-400/15 bg-white/5 p-3 text-cyan-200">
              <FiBookOpen />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Thesis</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{research.thesis}</h3>
            <p className="mt-4 text-slate-300">{research.summary}</p>
          </motion.article>
        </TiltCard>

        <TiltCard maxTilt={6} className="h-full">
          <motion.article
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="glass card-hover rounded-[28px] p-7 md:p-8 h-full"
          >
            <div className="mb-4 inline-flex rounded-full border border-cyan-400/15 bg-white/5 p-3 text-cyan-200">
              <FiAward />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Publication</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{research.publication}</h3>
            <p className="mt-4 text-slate-300">{research.journal}</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              <FiFileText className="text-cyan-200" />
              Explainable AI and lightweight model design
            </div>
          </motion.article>
        </TiltCard>
        </div>
      </div>
    </section>
  );
}
