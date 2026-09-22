import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { useContent } from '../context/ContentContext';
import TiltCard from './TiltCard';

export default function About() {
  const content = useContent();
  const about = content?.about;
  const paragraphs = about?.paragraphs || [];
  const career = about?.career || [];

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading
          eyebrow={about?.eyebrow || 'About'}
          title={about?.heading || 'About me'}
          subtitle="A concise introduction to the person behind the work, including career direction, research interests, and freelance positioning."
        />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <TiltCard maxTilt={5} className="h-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="glass card-hover rounded-[28px] p-7 md:p-9 h-full"
          >
            <div className="grid gap-4 text-base leading-8 text-slate-300 md:text-lg">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </TiltCard>

        <TiltCard maxTilt={5} className="h-full">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass card-hover rounded-[28px] p-7 md:p-9 h-full"
          >
            <h3 className="text-xl font-semibold text-white">{about?.careerTitle || 'Career direction'}</h3>
            <div className="subtle-line my-5" />
            <div className="space-y-5 text-sm leading-7 text-slate-300 md:text-base">
              {career.map((item) => (
                <div key={item.title}>
                  <p className="font-semibold text-cyan-200">{item.title}</p>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </TiltCard>
        </div>
      </div>
    </section>
  );
}
