import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnimatedCounters from './components/AnimatedCounters';
import About from './components/About';
import Skills from './components/Skills';
import EducationTimeline from './components/EducationTimeline';
import Research from './components/Research';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ContentProvider } from './context/ContentContext';

const AdminPage = lazy(() => import('./admin/AdminPage'));

function AdminFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center text-slate-400">
      Loading…
    </div>
  );
}

function PortfolioPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.title = 'Shahriar Ahmed Shovo | AI Developer Portfolio';
    document.documentElement.dataset.theme = 'dark';
    localStorage.removeItem('theme');

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', 'Shahriar Ahmed Shovo is an AI Enthusiast, CSE Graduate, Web Developer, and Extension Developer building futuristic, recruiter-friendly portfolio experiences.');
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <div className="portfolio-shell">
      <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <main>
        <Hero />
        <AnimatedCounters />
        <About />
        <Skills />
        <EducationTimeline />
        <Research />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Routes>
        <Route
          path="/admin"
          element={
            <Suspense fallback={<AdminFallback />}>
              <AdminPage />
            </Suspense>
          }
        />
        <Route path="*" element={<PortfolioPage />} />
      </Routes>
      </BrowserRouter>
    </ContentProvider>
  );
}