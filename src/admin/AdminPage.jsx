import { useEffect, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import SetupGuide from './SetupGuide';

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) return <SetupGuide />;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-400">
        Loading…
      </div>
    );
  }

  return session ? <Dashboard session={session} /> : <LoginForm />;
}