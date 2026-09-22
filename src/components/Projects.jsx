import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiGithub, FiPlayCircle } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { DEFAULT_CONTENT } from '../data/defaults';
import { fetchProjects } from '../lib/projects';
import { isSupabaseConfigured } from '../lib/supabase';
import { useContent } from '../context/ContentContext';
import TiltCard from './TiltCard';

const PLACEHOLDER_GRADIENTS = [
  'from-cyan-400/20 to-blue-500/20',
  'from-violet-400/20 to-fuchsia-500/20',
  'from-sky-400/20 to-indigo-500/20',
  'from-emerald-400/20 to-cyan-500/20',
  'from-amber-400/20 to-orange-500/20',
];

function ProjectPreview({ project, index }) {
  if (project.image_url) {
    return (
      <div className="relative h-52 overflow-hidden rounded-[24px] border border-white/10">
        <img src={project.image_url} alt={project.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,22,0.1),rgba(4,8,22,0.55))]" />
        <div className="absolute inset-x-4 top-4 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-2.5 text-xs uppercase tracking-[0.3em] text-white/80 backdrop-blur-md">
          {project.title}
        </div>
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-xs text-white/80">
          <span>Featured project</span>
          <span>{String(index + 1).padStart(2, '0')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative h-52 overflow-hidden rounded-[24px] bg-gradient-to-br ${PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length]} border border-white/10 p-5`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_20%)]" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/70">
          <span>Project</span>
          <span>{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div>
          <div className="mb-3 h-3 w-24 rounded-full bg-white/30" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-20 rounded-2xl border border-white/10 bg-white/10" />
            <div className="h-20 rounded-2xl border border-white/10 bg-white/15" />
            <div className="h-20 rounded-2xl border border-white/10 bg-white/8" />
          </div>
          <div className="mt-4 text-lg font-semibold text-white">{project.title}</div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const content = useContent();
  const projectsSection = content?.projectsSection || {};
  const [liveProjects, setLiveProjects] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    fetchProjects()
      .then((data) => {
        if (data) setLiveProjects(data);
      })
      .catch((error) => {
        console.error('Failed to load projects:', error.message);
      });
  }, []);

  const hasLiveData = liveProjects !== null;
  const fallbackProjects = DEFAULT_CONTENT.projects;

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading
          eyebrow={projectsSection.eyebrow || 'Projects'}
          title={projectsSection.title || 'A showcase built to feel like a modern product launch page.'}
          subtitle={projectsSection.subtitle || 'Each project card includes the full presentation stack: thumbnail, description, tech stack, and action buttons.'}
        />

        {hasLiveData && liveProjects.length === 0 ? (
          <p className="rounded-[24px] border border-white/10 bg-white/5 p-10 text-center text-slate-400">
            Projects will appear here once you add them from the admin panel.
          </p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {hasLiveData ? liveProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            )) : fallbackProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} fallback />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, fallback = false }) {
  const githubUrl = project.github_url;
  const liveUrl = project.live_url;
  const primaryUrl = liveUrl || githubUrl;
  const clickable = Boolean(primaryUrl);

  const showFallbackButtons = fallback || (!githubUrl && !liveUrl);

  function openProject(event) {
    if (!primaryUrl) return;
    event?.stopPropagation();
    window.open(primaryUrl, '_blank', 'noopener,noreferrer');
  }

  function handleKeyDown(event) {
    if (!primaryUrl) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProject();
    }
  }

  return (
    <TiltCard maxTilt={6} className="h-full">
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: index * 0.08 }}
        onClick={clickable ? openProject : undefined}
        onKeyDown={handleKeyDown}
        role={clickable ? 'link' : undefined}
        tabIndex={clickable ? 0 : undefined}
        title={clickable ? (liveUrl ? 'Open live site' : 'Open GitHub') : undefined}
        className={`project-glow glass card-hover rounded-[28px] p-5 h-full${clickable ? ' cursor-pointer' : ''}`}
      >
      <ProjectPreview project={project} index={index} />
      <h3 className="mt-5 text-2xl font-semibold text-white">{project.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{project.description}</p>

      {project.tech?.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              {tech}
            </span>
          ))}
        </div>
      ) : null}

      {showFallbackButtons ? (
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={githubUrl || '#contact'} target={githubUrl ? '_blank' : undefined} rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:text-white">
            <FiGithub /> GitHub <FiArrowUpRight />
          </a>
          <a href={liveUrl || '#contact'} target={liveUrl ? '_blank' : undefined} rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:text-white">
            <FiPlayCircle /> Live Demo <FiArrowUpRight />
          </a>
        </div>
      ) : (
        <div className="mt-6 flex flex-wrap gap-3">
          {githubUrl ? (
            <a href={githubUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:text-white">
              <FiGithub /> GitHub <FiArrowUpRight />
            </a>
          ) : null}
          {liveUrl ? (
            <a href={liveUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:text-white">
              <FiPlayCircle /> Live Demo <FiArrowUpRight />
            </a>
          ) : null}
        </div>
      )}
      </motion.article>
    </TiltCard>
  );
}