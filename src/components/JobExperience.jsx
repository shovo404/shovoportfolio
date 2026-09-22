import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiCheck, FiMapPin } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { useContent } from '../context/ContentContext';
import TiltCard from './TiltCard';

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function formatDate(value) {
  if (!value) return '';
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return value;
  return `${Number(match[3])} ${MONTH_NAMES[Number(match[2]) - 1]} ${match[1]}`;
}

function dateValue(value) {
  if (!value) return 0;

  const parsed = new Date(value.trim());
  if (!Number.isNaN(parsed.getTime())) return parsed.getTime();

  const year = Number((value.match(/(\d{4})/) || [])[1] || 0);
  const monthToken = (value.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i) || [])[0];
  const month = monthToken ? MONTHS.indexOf(monthToken.toLowerCase()) : 0;
  if (!year) return 0;

  return new Date(year, month, 1).getTime();
}

function sortJobs(jobs) {
  const endValue = (job) => (job.current ? Number.POSITIVE_INFINITY : dateValue(job.endDate));

  return [...jobs].sort((a, b) => {
    const endDiff = endValue(b) - endValue(a);
    if (endDiff !== 0) return endDiff;
    return dateValue(b.startDate) - dateValue(a.startDate);
  });
}

function formatRange(job) {
  const start = formatDate(job.startDate);
  const end = formatDate(job.endDate);

  if (job.current) return `${start || '—'} — Present`;
  if (start && end) return `${start} — ${end}`;
  if (start) return start;
  if (end) return end;
  return job.timeline || '';
}

export default function JobExperience() {
  const content = useContent();
  const section = content?.jobExperienceSection || {};
  const jobs = sortJobs(content?.jobExperience || []);

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
              <div key={`${job.role}-${job.startDate}-${index}`} className="job-timeline-item relative pl-20 md:pl-28">
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
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-semibold text-white md:text-2xl">{job.role}</h3>
                          {job.current ? (
                            <span className="job-current-badge">
                              <span className="job-current-dot" aria-hidden="true" /> Currently working
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 flex items-center gap-2 font-medium text-cyan-200/90">
                          <FiBriefcase /> {job.company}
                        </p>
                      </div>
                      <span className="job-chip">{formatRange(job)}</span>
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
                      <FiCalendar size={13} /> {formatRange(job)}
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