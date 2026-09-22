import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiCheck, FiMapPin } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { useContent } from '../context/ContentContext';
import TiltCard from './TiltCard';

export default function JobExperience() {
  const content = useContent();
  const section = content?.jobExperienceSection || {};
  const jobs = content?.jobExperience || [];

  if (jobs.length === 0) return null;

  return (
    <section id="job-experience" className="section pt-2 lg:pt-4">
      <div className="container">
        <SectionHeading
          eyebrow={section.eyebrow || 'Job Experience'}
          title={section.title || 'Roles that shaped the craft.'}
          subtitle={section.subtitle}
        />

        <div className="job-timeline relative mx-auto max-w-4xl">
          <span className="job-timeline-line" aria-hidden="true" />

          <div className="flex flex-col gap-8">
            {jobs.map((job, index) => (
              <div key={`${job.role}-${index}`} className="job-timeline-item relative pl-20 md:pl-28">
                <span className="job-marker">{String(index + 1).padStart(2, '0')}</span>

                <TiltCard maxTilt={6} className="h-full">
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: index * 0.06 }}
                    className="job-card glass card-hover rounded-[28px] border border-white/10 p-6 md:p-8"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white md:text-2xl">{job.role}</h3>
                        <p className="mt-1 flex items-center gap-2 font-medium text-cyan-200/90">
                          <FiBriefcase /> {job.company}
                        </p>
                      </div>
                      <span className="job-chip">{job.timeline}</span>
                    </div>

                    {job.location ? (
                      <p className="mt-3 flex items-center gap-2 text-sm text-slate-400">
                        <FiMapPin /> {job.location}
                      </p>
                    ) : null}

                    {(job.highlights || []).length > 0 ? (
                      <ul className="mt-5 space-y-2.5">
                        {job.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-3 text-sm leading-7 text-slate-300 md:text-base">
                            <span className="job-check mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-cyan-400/15 text-cyan-200">
                              <FiCheck size={11} />
                            </span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-xs uppercase tracking-[0.25em] text-slate-500">
                      <FiCalendar size={13} /> {job.timeline}
                    </div>
                  </motion.article>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}