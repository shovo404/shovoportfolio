import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import SectionHeading from './SectionHeading';
import { useContent } from '../context/ContentContext';
import TiltCard from './TiltCard';

export default function Contact() {
  const content = useContent();
  const contact = content?.contact || {};
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio inquiry from ${formState.name || 'a visitor'}`,
    );
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`,
    );
    const mailto = `mailto:${contact.email || 'shovo@example.com'}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title="A modern glassmorphism contact block for recruiters, clients, and collaborators."
          subtitle="Use the form, email link, or social links to start a conversation about AI work, web projects, freelance jobs, or research opportunities."
        />

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <TiltCard maxTilt={6} className="h-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="glass card-hover rounded-[28px] p-7 h-full"
          >
            <div className="mb-4 inline-flex rounded-full border border-cyan-400/15 bg-white/5 p-3 text-cyan-200">
              <FiMail />
            </div>
            <h3 className="text-2xl font-semibold text-white">
              {contact.heading || 'Let’s build something intelligent.'}
            </h3>
            <p className="mt-4 text-slate-300">{contact.subheading}</p>

            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <a
                href={`mailto:${contact.email || 'shovo@example.com'}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-300/30 hover:text-white"
              >
                <FiMail className="text-cyan-200" /> {contact.email || 'shovo@example.com'}
              </a>

              {contact.githubUrl ? (
                <a
                  href={contact.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-300/30 hover:text-white"
                >
                  <FaGithub className="text-cyan-200" /> GitHub profile
                </a>
              ) : null}

              {contact.linkedinUrl ? (
                <a
                  href={contact.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-300/30 hover:text-white"
                >
                  <FaLinkedinIn className="text-cyan-200" /> LinkedIn profile
                </a>
              ) : null}
            </div>
          </motion.div>
        </TiltCard>

          <TiltCard maxTilt={6} className="h-full">
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              onSubmit={handleSubmit}
              className="glass card-hover rounded-[28px] p-7 md:p-8 h-full"
            >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-slate-300">
                Name
                <input
                  className="contact-input"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Email
                <input
                  className="contact-input"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
              </label>
            </div>

            <label className="mt-4 grid gap-2 text-sm text-slate-300">
              Message
              <textarea
                className="contact-input min-h-44"
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Tell me about your project, research, or collaboration idea."
              />
            </label>

            <button type="submit" className="neon-button mt-6 w-full justify-center">
              Send Message <FiSend />
            </button>
            </motion.form>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
