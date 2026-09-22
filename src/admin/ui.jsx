export function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-slate-500">{hint}</span> : null}
    </label>
  );
}

const inputClass =
  'w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10';

export function TextInput(props) {
  return <input {...props} className={`${inputClass} ${props.className || ''}`} />;
}

export function TextArea(props) {
  return <textarea {...props} className={`${inputClass} min-h-[120px] resize-y ${props.className || ''}`} />;
}

export function Button({ variant = 'primary', className = '', ...props }) {
  const variants = {
    primary:
      'inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50',
    secondary:
      'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-50',
    danger:
      'inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-5 py-2.5 text-sm text-red-200 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50',
  };

  return <button {...props} className={`${variants[variant]} ${className}`} />;
}