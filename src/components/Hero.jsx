import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { FiArrowRight, FiDownload, FiMail } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';
import { useTyping } from '../hooks/useTyping';
import { downloadResume } from '../utils/downloadResume';
import FloatingParticles from './FloatingParticles';
import TiltCard from './TiltCard';

const FALLBACK_HERO_IMAGES = ['/photo_2026-05-09%2004.51.31.jpeg'];

export default function Hero() {
  const content = useContent();
  const profile = content?.profile;
  const hero = content?.hero;

  const highlights = hero?.highlights?.length ? hero.highlights : ['AI systems'];
  const typed = useTyping(highlights);

  const heroImages = useMemo(
    () => (hero?.heroImages?.length ? hero.heroImages : FALLBACK_HERO_IMAGES),
    [hero?.heroImages],
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const pickRandomImage = () => {
      setActiveImageIndex((currentIndex) => {
        if (heroImages.length <= 1) return currentIndex;

        let nextIndex = Math.floor(Math.random() * heroImages.length);
        if (nextIndex === currentIndex) {
          nextIndex = (currentIndex + 1) % heroImages.length;
        }

        return nextIndex;
      });
    };

    pickRandomImage();
    const timer = window.setInterval(pickRandomImage, 3600);

    return () => window.clearInterval(timer);
  }, [heroImages]);

  const activeImage = heroImages[activeImageIndex];

  return (
    <section id="hero" className="relative overflow-hidden pt-8 lg:pt-10">
      <FloatingParticles />
      <div className="hero-bg-glow" aria-hidden="true" />
      <div className="container relative z-10">
        <div className="hero-grid">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-cyan-400/15 bg-white/5 px-4 py-2 text-sm text-slate-200 shadow-lg shadow-cyan-500/10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300" />
              </span>
              {hero?.badge || 'Available for work'}
            </div>

            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-200/80">{hero?.eyebrow}</p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-white md:text-6xl">
              {hero?.headingPre}
              {hero?.headingHighlight ? <span className="text-gradient"> {hero.headingHighlight}</span> : null}
              {hero?.headingPost ? <span> {hero.headingPost}</span> : null}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg md:leading-8">
              {profile?.bio}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-300 md:text-base">
              <span className="text-slate-400">{hero?.focusedLabel || 'Currently focused on'}</span>
              <span className="rounded-full border border-cyan-400/20 bg-white/5 px-4 py-2 text-cyan-100 shadow-lg shadow-cyan-500/10">
                {typed || highlights[0]}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{profile?.title}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{profile?.availability}</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <a href="#contact" className="neon-button">
                Hire Me <FiArrowRight />
              </a>
              <a href="#projects" className="neon-button secondary-button">
                View Projects <FiArrowRight />
              </a>
              <button type="button" onClick={() => downloadResume(content)} className="neon-button secondary-button">
                Download CV <FiDownload />
              </button>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <a href="#contact" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/40 hover:text-white">
                <FiMail />
              </a>
              <a href="#contact" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/40 hover:text-white">
                <FaGithub />
              </a>
              <a href="#contact" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/40 hover:text-white">
                <FaLinkedinIn />
              </a>
            </div>

            <motion.div
              className="hero-mobile-gallery glass card-hover mt-8 overflow-hidden rounded-[30px] border border-white/10 lg:hidden"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
            >
              <TiltCard maxTilt={8}>
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt={`Portrait preview ${activeImageIndex + 1}`}
                    className="h-full w-full object-cover object-center"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,22,0.04),rgba(4,8,22,0.45))]" />
                  <div className="absolute inset-x-4 top-4 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 backdrop-blur-md tilt-depth">
                    <p className="text-[0.65rem] uppercase tracking-[0.35em] text-cyan-100/70">Auto rotating portrait preview</p>
                    <p className="mt-1 text-sm font-medium text-white">A curated image changes in the background automatically.</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual-layer hidden lg:block"
          initial={{ opacity: 0, scale: 0.98, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.12 }}
          aria-hidden="true"
        >
          <TiltCard maxTilt={10} global>
            <div className="float-3d">
              <span className="orbit-ring r1" aria-hidden="true" />
              <span className="orbit-ring r2" aria-hidden="true" />
              <span className="orbit-ring r3" aria-hidden="true" />
              <span className="fx-cube c1" aria-hidden="true" />
              <span className="fx-cube c2" aria-hidden="true" />
              <span className="fx-cube c3" aria-hidden="true" />
              <div className="hero-visual-card glass card-hover overflow-hidden rounded-[36px] border border-white/10">
                <div className="hero-visual-mask">
              <motion.img
                key={activeImage}
                src={activeImage}
                alt=""
                className="hero-visual-image"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
              />
              <div className="hero-visual-overlay" />
<div className="hero-visual-content tilt-depth">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.35em] text-cyan-100/75">Auto rotating background</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">Portrait gallery preview</h2>
                  </div>
                  <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs tracking-[0.3em] text-cyan-100">
                    {String(activeImageIndex + 1).padStart(2, '0')} / {String(heroImages.length).padStart(2, '0')}
                  </div>
                </div>
              </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        <div className="mt-8 grid gap-4 rounded-[28px] border border-white/10 bg-white/5 p-4 md:grid-cols-4">
          {(hero?.quickTags || []).map((item) => (
            <TiltCard key={item} maxTilt={9} className="h-full">
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-300">
                {item}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
