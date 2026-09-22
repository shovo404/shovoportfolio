import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiLock, FiMail } from 'react-icons/fi';
import { supabase } from '../lib/supabase';
import { Button, Field, TextInput } from './ui';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
    }

    setSubmitting(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
          <FiArrowLeft /> Back to portfolio
        </Link>

        <div className="glass rounded-[28px] border border-white/10 p-8">
          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-white/5 shadow-lg shadow-cyan-500/10">
              <FiLock className="text-xl text-cyan-300" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">Admin Login</h1>
              <p className="mt-1 text-sm text-slate-400">Sign in to manage your portfolio projects</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Field label="Email">
              <TextInput
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </Field>

            <Field label="Password">
              <TextInput
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </Field>

            {error ? (
              <p className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>
            ) : null}

            <Button type="submit" disabled={submitting}>
              <FiMail /> {submitting ? 'Signing in…' : 'Sign In'}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs leading-5 text-slate-500">
            New admin? Create your user in the Supabase dashboard under{' '}
            <span className="text-slate-400">Authentication → Users → Add new user</span>.
          </p>
        </div>
      </div>
    </div>
  );
}