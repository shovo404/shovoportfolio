import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const STEPS = [
  {
    title: 'Create a Supabase project',
    body: 'Go to supabase.com, sign in, and create a new project (free tier is enough).',
  },
  {
    title: 'Run the schema SQL',
    body: 'In Supabase dashboard → SQL Editor, paste everything from supabase/schema.sql and run it. This creates the projects table and the image storage bucket.',
  },
  {
    title: 'Create your admin user',
    body: 'Go to Authentication → Users → Add new user and set your admin email + password.',
  },
  {
    title: 'Copy your API keys',
    body: 'Go to Project Settings → API and copy your Project URL and anon public key.',
  },
  {
    title: 'Add keys to .env',
    body: 'Create a .env file (copy .env.example) and fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. Restart the dev server.',
  },
];

export default function SetupGuide() {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
          <FiArrowLeft /> Back to portfolio
        </Link>

        <div className="glass rounded-[28px] border border-white/10 p-8">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/80">Admin panel</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Almost ready</h1>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              This admin panel needs a Supabase project. Follow the steps below — it takes about 5 minutes and is completely free.
            </p>
          </div>

          <ol className="flex flex-col gap-4">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-cyan-400/20 bg-white/5 text-sm font-semibold text-cyan-200">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-medium text-white">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-6 text-xs leading-5 text-slate-500">
            The schema SQL file lives at <span className="text-slate-400">supabase/schema.sql</span> in this project.
          </p>
        </div>
      </div>
    </div>
  );
}