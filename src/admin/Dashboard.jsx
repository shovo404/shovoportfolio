import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiExternalLink, FiGithub, FiLogOut, FiPlayCircle, FiPlus, FiTrash2 } from 'react-icons/fi';
import { supabase } from '../lib/supabase';
import { createProject, deleteProject, fetchProjects, removeProjectImage, updateProject } from '../lib/projects';
import ProjectForm from './ProjectForm';
import ContentEditor from './ContentEditor';
import { Button } from './ui';

const PLACEHOLDER_GRADIENTS = [
  'from-cyan-400/20 to-blue-500/20',
  'from-violet-400/20 to-fuchsia-500/20',
  'from-sky-400/20 to-indigo-500/20',
  'from-emerald-400/20 to-cyan-500/20',
  'from-amber-400/20 to-orange-500/20',
];

export default function Dashboard({ session }) {
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    setError('');
    try {
      const data = await fetchProjects();
      setProjects(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load projects.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  async function handleSaved(payload) {
    try {
      if (editingProject) {
        await updateProject(editingProject.id, payload);
      } else {
        await createProject(payload);
      }
      setFormOpen(false);
      setEditingProject(null);
      loadProjects();
    } catch (err) {
      setError(err.message || 'Failed to save project.');
    }
  }

  async function handleDelete(project) {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    try {
      await deleteProject(project.id);
      await removeProjectImage(project.image_url);
      loadProjects();
    } catch (err) {
      setError(err.message || 'Failed to delete project.');
    }
  }

  function openAdd() {
    setEditingProject(null);
    setFormOpen(true);
  }

  function openEdit(project) {
    setEditingProject(project);
    setFormOpen(true);
  }

  return (
    <div className="min-h-screen px-4 pb-16 pt-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link to="/" className="mb-2 inline-block text-sm text-slate-400 transition hover:text-white">← Back to portfolio</Link>
            <h1 className="text-3xl font-semibold text-white">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-slate-400">
              Logged in as <span className="text-cyan-200">{session.user.email}</span> · changes appear on the live site immediately
            </p>
          </div>

          <Button variant="secondary" onClick={handleLogout}>
            <FiLogOut /> Logout
          </Button>
        </div>

        <div className="mb-8 flex gap-2">
          {[
            { key: 'projects', label: 'Projects' },
            { key: 'content', label: 'Site Content' },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={`rounded-full px-5 py-2.5 text-sm transition ${
                tab === item.key
                  ? 'bg-cyan-400 font-semibold text-slate-950'
                  : 'border border-white/10 bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {tab === 'content' ? (
          <ContentEditor />
        ) : (
          <>
            <div className="mb-6 flex justify-end">
              <Button onClick={openAdd}>
                <FiPlus /> Add Project
              </Button>
            </div>

            {error ? (
              <p className="mb-6 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>
            ) : null}

            {loading ? (
              <div className="glass rounded-[28px] border border-white/10 p-10 text-center text-slate-400">
                Loading projects…
              </div>
            ) : projects.length === 0 ? (
              <div className="glass rounded-[28px] border border-white/10 p-10 text-center">
                <p className="text-lg font-medium text-white">No projects yet</p>
                <p className="mb-5 mt-1 text-sm text-slate-400">Add your first project and it will show on your portfolio instantly.</p>
                <Button onClick={openAdd}>
                  <FiPlus /> Add Project
                </Button>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {projects.map((project, index) => (
                  <article key={project.id} className="admin-card rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-start gap-4">
                      {project.image_url ? (
                        <img src={project.image_url} alt={project.title} className="h-20 w-28 flex-none rounded-xl border border-white/10 object-cover" />
                      ) : (
                        <div className={`h-20 w-28 flex-none rounded-xl bg-gradient-to-br ${PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length]} border border-white/10`} />
                      )}

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-lg font-semibold text-white">{project.title}</h3>
                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-400">{project.description || 'No description.'}</p>
                      </div>

                      <div className="flex flex-none flex-col gap-2">
                        <button type="button" onClick={() => openEdit(project)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:text-white" aria-label="Edit" title="Edit">
                          <FiEdit2 size={15} />
                        </button>
                        <button type="button" onClick={() => handleDelete(project)} className="flex h-9 w-9 items-center justify-center rounded-full border border-red-400/20 bg-red-500/10 text-red-300 transition hover:bg-red-500/20" aria-label="Delete" title="Delete">
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </div>

                    {(project.github_url || project.live_url) && (
                      <div className="mt-4 flex flex-wrap gap-3 text-xs">
                        {project.github_url && (
                          <a href={project.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300 transition hover:text-white">
                            <FiGithub /> GitHub <FiExternalLink />
                          </a>
                        )}
                        {project.live_url && (
                          <a href={project.live_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300 transition hover:text-white">
                            <FiPlayCircle /> Demo <FiExternalLink />
                          </a>
                        )}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {formOpen ? (
        <ProjectForm
          initialProject={editingProject}
          onCancel={() => {
            setFormOpen(false);
            setEditingProject(null);
          }}
          onSaved={handleSaved}
        />
      ) : null}
    </div>
  );
}
