import { motion } from 'framer-motion';
import { FiLock, FiMenu, FiX } from 'react-icons/fi';
import { useContent } from '../context/ContentContext';
import { getIcon } from '../lib/icons';

export default function Navbar({ mobileOpen, setMobileOpen }) {
  const content = useContent();
  const navSections = (content?.sections || []).filter((section) => section.enabled);
  const socialLinks = content?.socialLinks || [];

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/65 nav-blur">
      <div className="container flex items-center justify-between py-4">
        <a href="#hero" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-white/5 shadow-lg shadow-cyan-500/10">
            <span className="text-sm font-black tracking-[0.2em] text-gradient">SS</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{content?.profile?.name || 'Portfolio'}</p>
            <p className="text-xs text-slate-400">AI-focused developer portfolio</p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {navSections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="text-sm text-slate-300 transition hover:text-white">
              {section.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {socialLinks.slice(0, 2).map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <a key={item.label} href={item.href} aria-label={item.label} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-300/30 hover:text-white">
                <Icon />
              </a>
            );
          })}
          <a href="/admin" className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-4 py-2 text-sm text-cyan-100 transition hover:border-cyan-300/40 hover:text-white">
            <FiLock /> Admin
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          className="border-t border-white/5 bg-slate-950/90 lg:hidden"
        >
          <div className="container flex flex-col gap-4 py-5">
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} onClick={() => setMobileOpen(false)} className="text-sm text-slate-300 transition hover:text-white">
                {section.label}
              </a>
            ))}
            <a href="/admin" onClick={() => setMobileOpen(false)} className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-4 py-2 text-sm text-cyan-100 transition hover:border-cyan-300/40 hover:text-white">
              <FiLock /> Admin Login
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
