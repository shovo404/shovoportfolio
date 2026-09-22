import { useEffect, useRef, useState } from 'react';
import { FiImage, FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import { uploadProjectImage } from '../lib/projects';
import { Button, Field, TextArea, TextInput } from './ui';

const EMPTY_PROJECT = {
  title: '',
  description: '',
  tech: [],
  image_url: '',
  github_url: '',
  live_url: '',
};

export default function ProjectForm({ initialProject, onCancel, onSaved }) {
  const [project, setProject] = useState(() => ({
    ...EMPTY_PROJECT,
    ...(initialProject || {}),
    tech: initialProject?.tech || [],
  }));
  const [techInput, setTechInput] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  function setField(key, value) {
    setProject((current) => ({ ...current, [key]: value }));
  }

  function addTech() {
    const value = techInput.trim();
    if (!value) return;
    const items = value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    if (!items.length) return;

    setProject((current) => ({
      ...current,
      tech: [...new Set([...current.tech, ...items])],
    }));
    setTechInput('');
  }

  function removeTech(item) {
    setProject((current) => ({
      ...current,
      tech: current.tech.filter((tech) => tech !== item),
    }));
  }

  async function handleSave() {
    if (!project.title.trim()) {
      setError('Project title is required.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      let imageUrl = project.image_url;

      if (imageFile) {
        imageUrl = await uploadProjectImage(imageFile, project.image_url);
      } else if (initialProject?.image_url && !project.image_url) {
        imageUrl = null;
      }

      onSaved({
        title: project.title.trim(),
        description: project.description.trim(),
        tech: project.tech,
        image_url: imageUrl,
        github_url: project.github_url.trim() || null,
        live_url: project.live_url.trim() || null,
      });
    } catch (err) {
      setError(err.message || 'Failed to save project.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="admin-card max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-white/10 bg-slate-950 p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">{initialProject ? 'Edit Project' : 'Add New Project'}</h2>
          <button type="button" onClick={onCancel} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:text-white" aria-label="Close">
            <FiX />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <Field label="Project Title">
            <TextInput
              value={project.title}
              onChange={(event) => setField('title', event.target.value)}
              placeholder="AI Clip Generator"
            />
          </Field>

          <Field label="Description">
            <TextArea
              value={project.description}
              onChange={(event) => setField('description', event.target.value)}
              placeholder="Short description of the project…"
            />
          </Field>

          <Field label="Technologies" hint="Type a tag and press '+', or paste comma-separated values">
            <div className="flex gap-2">
              <TextInput
                value={techInput}
                onChange={(event) => setTechInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ',') {
                    event.preventDefault();
                    addTech();
                  }
                }}
                placeholder="React, AI, Automation…"
              />
              <Button type="button" variant="secondary" onClick={addTech}>
                <FiPlus />
              </Button>
            </div>
            {project.tech.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    {item}
                    <button type="button" onClick={() => removeTech(item)} className="text-slate-500 transition hover:text-red-300" aria-label={`Remove ${item}`}>
                      <FiX size={14} />
                    </button>
                  </span>
                ))}
              </div>
            ) : null}
          </Field>

          <Field label="Project Image" hint="PNG / JPG / WebP. Uploaded to Supabase Storage.">
            <div className="flex items-center gap-4">
              {project.image_url ? (
                <img
                  src={imageFile ? URL.createObjectURL(imageFile) : project.image_url}
                  alt="Preview"
                  className="h-20 w-28 rounded-xl border border-white/10 object-cover"
                />
              ) : (
                <div className="flex h-20 w-28 items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/5 text-slate-500">
                  <FiImage />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) setImageFile(file);
                  }}
                />
                <Button type="button" variant="secondary" onClick={() => fileInputRef.current?.click()}>
                  <FiImage /> Choose Image
                </Button>
                {(project.image_url || imageFile) && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setImageFile(null);
                      setField('image_url', '');
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                  >
                    <FiTrash2 /> Remove
                  </Button>
                )}
              </div>
            </div>
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="GitHub Link">
              <TextInput
                value={project.github_url}
                onChange={(event) => setField('github_url', event.target.value)}
                placeholder="https://github.com/…"
              />
            </Field>

            <Field label="Live Demo Link">
              <TextInput
                value={project.live_url}
                onChange={(event) => setField('live_url', event.target.value)}
                placeholder="https://…"
              />
            </Field>
          </div>

          {error ? (
            <p className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>
          ) : null}

          <div className="mt-2 flex flex-wrap gap-3">
            <Button type="button" onClick={handleSave} disabled={uploading}>
              {uploading ? 'Saving…' : initialProject ? 'Save Changes' : 'Add Project'}
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}