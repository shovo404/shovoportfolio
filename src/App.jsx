import { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnimatedCounters from './components/AnimatedCounters';
import JobExperience from './components/JobExperience';
import Experience from './components/Experience';
import About from './components/About';
import Skills from './components/Skills';
import EducationTimeline from './components/EducationTimeline';
import Research from './components/Research';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ContentProvider, useContent } from './context/ContentContext';

const AdminPage = lazy(() => import('./admin/AdminPage'));

const SECTION_COMPONENTS = {
  'job-experience': <JobExperience />,
  experience: <Experience />,
  about: <About />,
  skills: <Skills />,
  education: <EducationTimeline />,
  research: <Research />,
  projects: <Projects />,
  contact: <Contact />,
};

function AdminFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center text-slate-400">
      Loading…
    </div>
  );
}

function PortfolioPage() {
  const content = useContent();
  const [mobileOpen, setMobileOpen] = useState(false);

  const enabledSections = (content?.sections || []).filter(
    (section) => section.enabled && SECTION_COMPONENTS[section.id],
  );

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
        {enabledSections.map((section) => (
          <Fragment key={section.id}>{SECTION_COMPONENTS[section.id]}</Fragment>
        ))}
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