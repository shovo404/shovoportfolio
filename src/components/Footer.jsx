import { useContent } from '../context/ContentContext';

export default function Footer() {
  const content = useContent();
  const footer = content?.footer || {};

  return (
    <footer className="border-t border-white/5 bg-slate-950/70 py-10">
      <div className="container flex flex-col gap-3">
        <div>
          <p className="text-lg font-semibold text-white">{footer.name || 'Portfolio'}</p>
        </div>
      </div>

      <div className="container mt-8 flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-500">
        <span>{footer.copyright || '© 2026'}</span>
        <a href="/admin" className="tracking-[0.25em] text-slate-600 transition hover:text-slate-300">
          Admin
        </a>
      </div>
    </footer>
  );
}
