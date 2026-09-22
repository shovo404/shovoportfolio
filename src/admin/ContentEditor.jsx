import { useEffect, useMemo, useRef, useState } from 'react';
import { FiEdit2, FiImage, FiLoader, FiPlus, FiSave, FiTrash2, FiUpload, FiX } from 'react-icons/fi';
import { fetchSiteContent, saveSiteContent } from '../lib/content';
import { deleteImage, uploadImage, uploadNewImage } from '../lib/uploads';
import { createProject, deleteProject, fetchProjects, removeProjectImage, updateProject } from '../lib/projects';
import ProjectForm from './ProjectForm';
import { ICON_OPTIONS } from '../lib/icons';
import { mergeContent } from '../data/defaults';
import { Button, Field, TextArea, TextInput } from './ui';

const TABS = [
  'Profile',
  'Hero',
  'Job Experience',
  'About',
  'Skills',
  'Education',
  'Research',
  'Experience',
  'Projects',
  'Contact & Footer',
  'Links',
];

function CardEditor({ label, children, onRemove }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</span>
        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-red-400/20 bg-red-500/10 text-red-300 transition hover:bg-red-500/20"
            aria-label="Remove"
          >
            <FiTrash2 size={13} />
          </button>
        ) : null}
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function IconSelect({ value, onChange }) {
  return (
    <select
      value={value || ''}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2.5 text-sm text-white outline-none transition focus:border-cyan-400/40"
    >
      {!value ? <option value="">No icon</option> : null}
      {ICON_OPTIONS.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
}

function LinesEditor({ label, hint, lines, onChange }) {
  return (
    <Field label={label} hint={hint || 'One item per line'}>
      <TextArea
        value={lines.join('\n')}
        onChange={(event) => onChange(event.target.value.split('\n').map((line) => line.trim()).filter(Boolean))}
      />
    </Field>
  );
}

function HeroImagesEditor({ images, onChange }) {
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [error, setError] = useState('');
  const addFileRef = useRef(null);
  const rowFileRefs = useRef({});

  async function runUpload(index, file) {
    if (!file) return;
    setUploadingIndex(index);
    setError('');

    try {
      if (index === -1) {
        const url = await uploadImage(file, 'hero');
        onChange([...(images || []), url]);
      } else {
        const url = await uploadNewImage(file, 'hero', images[index]);
        const next = [...images];
        next[index] = url;
        onChange(next);
      }
    } catch (err) {
      setError(err.message || 'Upload failed.');
    } finally {
      setUploadingIndex(null);
    }
  }

  async function remove(index) {
    setError('');
    try {
      await deleteImage(images[index]);
      onChange(images.filter((_, i) => i !== index));
    } catch (err) {
      setError(err.message || 'Failed to delete image.');
    }
  }

  async function handleRowFile(index, file) {
    await runUpload(index, file);
    if (rowFileRefs.current[index]) rowFileRefs.current[index].value = '';
  }

  async function handleAddFile(file) {
    await runUpload(-1, file);
    if (addFileRef.current) addFileRef.current.value = '';
  }

  const list = images || [];

  return (
    <Field
      label="Hero images"
      hint="Upload photos from your device, or paste a URL. Hero rotates through them automatically."
    >
      <div className="flex flex-col gap-4">
        {list.length ? (
          list.map((imageUrl, index) => (
            <div
              key={`${index}-${imageUrl}`}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
            >
              <div className="flex flex-wrap items-center gap-4">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={`Hero image ${index + 1}`}
                    className="h-20 w-24 flex-none rounded-xl border border-white/10 object-cover"
                    onError={(event) => {
                      event.currentTarget.style.opacity = '0.25';
                    }}
                  />
                ) : (
                  <div className="flex h-20 w-24 flex-none items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/5 text-slate-500">
                    <FiImage />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                    Image {index + 1}
                  </div>
                  <TextInput
                    value={imageUrl}
                    placeholder="Image path or URL"
                    onChange={(event) => {
                      const next = [...list];
                      next[index] = event.target.value;
                      onChange(next);
                    }}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    ref={(element) => {
                      rowFileRefs.current[index] = element;
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => handleRowFile(index, event.target.files?.[0])}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => rowFileRefs.current[index]?.click()}
                    disabled={uploadingIndex !== null}
                  >
                    {uploadingIndex === index ? <FiLoader className="animate-spin" /> : <FiUpload />}
                    Replace
                  </Button>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    disabled={uploadingIndex !== null}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-red-400/20 bg-red-500/10 text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={`Delete hero image ${index + 1}`}
                    title="Delete from storage"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-center text-sm text-slate-400">
            No hero images yet — upload one below.
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={addFileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => handleAddFile(event.target.files?.[0])}
          />
          <Button type="button" variant="secondary" onClick={() => addFileRef.current?.click()} disabled={uploadingIndex !== null}>
            {uploadingIndex === -1 ? <FiLoader className="animate-spin" /> : <FiUpload />}
            Upload image from device
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onChange([...(list || []), ''])}
            disabled={uploadingIndex !== null}
          >
            <FiPlus /> Add URL
          </Button>
        </div>

        {error ? (
          <p className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>
        ) : null}
      </div>
    </Field>
  );
}

function ProjectsEditor({ content, update }) {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

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

  useEffect(() => {
    loadProjects();
  }, []);

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

  return (
    <div className="flex flex-col gap-6">
      <Field label="Section heading">
        <TextInput
          value={content.projectsSection?.title || ''}
          onChange={(e) => update((c) => { c.projectsSection.title = e.target.value; })}
        />
      </Field>
      <Field label="Section subtitle">
        <TextArea
          value={content.projectsSection?.subtitle || ''}
          onChange={(e) => update((c) => { c.projectsSection.subtitle = e.target.value; })}
        />
      </Field>

      <div className="border-t border-white/10 pt-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-300">Project cards</p>
          <Button type="button" onClick={() => { setEditingProject(null); setFormOpen(true); }}>
            <FiPlus /> Add Project
          </Button>
        </div>

        {error ? (
          <p className="mb-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>
        ) : null}

        {loading ? (
          <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-slate-400">
            Loading projects…
          </p>
        ) : projects.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-center text-sm text-slate-400">
            No projects yet — add your first one above.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                {project.image_url ? (
                  <img src={project.image_url} alt={project.title} className="h-16 w-24 flex-none rounded-xl border border-white/10 object-cover" />
                ) : (
                  <div className="flex h-16 w-24 flex-none items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-500">
                    <FiImage />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="truncate font-semibold text-white">{project.title}</h4>
                  <p className="mt-0.5 line-clamp-1 text-sm text-slate-400">{project.description || 'No description.'}</p>
                </div>
                <div className="flex flex-none gap-2">
                  <button
                    type="button"
                    onClick={() => { setEditingProject(project); setFormOpen(true); }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:text-white"
                    aria-label="Edit project"
                    title="Edit"
                  >
                    <FiEdit2 size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(project)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-red-400/20 bg-red-500/10 text-red-300 transition hover:bg-red-500/20"
                    aria-label="Delete project"
                    title="Delete"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
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

export default function ContentEditor() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('Profile');

  useEffect(() => {
    let cancelled = false;

    fetchSiteContent()
      .then((data) => {
        if (!cancelled) setContent(mergeContent(data));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load content.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function update(updater) {
    setContent((current) => {
      const next = structuredClone(current);
      updater(next);
      return next;
    });
  }

  async function handleSave() {
    setSaving(true);
    setMessage('');
    setError('');

    try {
      await saveSiteContent(content);
      setMessage('Content saved. The live site now shows your changes.');
      window.setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setError(err.message || 'Failed to save content.');
    } finally {
      setSaving(false);
    }
  }

  const tabContent = useMemo(() => {
    if (!content) return null;

    switch (activeTab) {
      case 'Profile':
        return (
          <div className="flex flex-col gap-5">
            <Field label="Name">
              <TextInput
                value={content.profile.name}
                onChange={(e) => update((c) => { c.profile.name = e.target.value; })}
              />
            </Field>
            <Field label="Title">
              <TextInput
                value={content.profile.title}
                onChange={(e) => update((c) => { c.profile.title = e.target.value; })}
              />
            </Field>
            <Field label="Bio">
              <TextArea
                value={content.profile.bio}
                onChange={(e) => update((c) => { c.profile.bio = e.target.value; })}
              />
            </Field>
            <Field label="Availability">
              <TextInput
                value={content.profile.availability}
                onChange={(e) => update((c) => { c.profile.availability = e.target.value; })}
              />
            </Field>
          </div>
        );

      case 'Hero':
        return (
          <div className="flex flex-col gap-5">
            <Field label="Badge text">
              <TextInput
                value={content.hero.badge}
                onChange={(e) => update((c) => { c.hero.badge = e.target.value; })}
              />
            </Field>
            <Field label="Eyebrow text">
              <TextInput
                value={content.hero.eyebrow}
                onChange={(e) => update((c) => { c.hero.eyebrow = e.target.value; })}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Heading (before highlight)">
                <TextInput
                  value={content.hero.headingPre}
                  onChange={(e) => update((c) => { c.hero.headingPre = e.target.value; })}
                />
              </Field>
              <Field label="Heading (highlighted)">
                <TextInput
                  value={content.hero.headingHighlight}
                  onChange={(e) => update((c) => { c.hero.headingHighlight = e.target.value; })}
                />
              </Field>
              <Field label="Heading (after highlight)">
                <TextInput
                  value={content.hero.headingPost}
                  onChange={(e) => update((c) => { c.hero.headingPost = e.target.value; })}
                />
              </Field>
            </div>
            <Field label="'Currently focused on' label">
              <TextInput
                value={content.hero.focusedLabel}
                onChange={(e) => update((c) => { c.hero.focusedLabel = e.target.value; })}
              />
            </Field>
            <LinesEditor
              label="Typing highlights"
              lines={content.hero.highlights}
              onChange={(lines) => update((c) => { c.hero.highlights = lines; })}
            />
            <LinesEditor
              label="Quick tags (bottom grid)"
              lines={content.hero.quickTags}
              onChange={(lines) => update((c) => { c.hero.quickTags = lines; })}
            />
            <HeroImagesEditor
              images={content.hero.heroImages}
              onChange={(images) => update((c) => { c.hero.heroImages = images; })}
            />
          </div>
        );

      case 'Job Experience':
        return (
          <div className="flex flex-col gap-5">
            <Field label="Section eyebrow">
              <TextInput
                value={content.jobExperienceSection.eyebrow}
                onChange={(e) => update((c) => { c.jobExperienceSection.eyebrow = e.target.value; })}
              />
            </Field>
            <Field label="Section heading">
              <TextInput
                value={content.jobExperienceSection.title}
                onChange={(e) => update((c) => { c.jobExperienceSection.title = e.target.value; })}
              />
            </Field>
            <Field label="Section subtitle">
              <TextArea
                value={content.jobExperienceSection.subtitle}
                onChange={(e) => update((c) => { c.jobExperienceSection.subtitle = e.target.value; })}
              />
            </Field>

            <div className="border-t border-white/10 pt-5">
              {content.jobExperience.map((item, index) => (
                <CardEditor
                  key={index}
                  label={`Job ${index + 1}`}
                  onRemove={() => update((c) => { c.jobExperience.splice(index, 1); })}
                >
                  <TextInput
                    value={item.role}
                    placeholder="Role"
                    onChange={(e) => update((c) => { c.jobExperience[index].role = e.target.value; })}
                  />
                  <TextInput
                    value={item.company}
                    placeholder="Company / organization"
                    onChange={(e) => update((c) => { c.jobExperience[index].company = e.target.value; })}
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="From (start date)" hint="e.g. 12 March 2024">
                      <TextInput
                        value={item.startDate || ''}
                        placeholder="From"
                        onChange={(e) => update((c) => { c.jobExperience[index].startDate = e.target.value; })}
                      />
                    </Field>
                    <Field label="To (end date)" hint="e.g. 5 June 2025">
                      <TextInput
                        value={item.current ? '' : (item.endDate || '')}
                        placeholder={item.current ? 'Present' : 'To'}
                        disabled={item.current}
                        onChange={(e) => update((c) => { c.jobExperience[index].endDate = e.target.value; })}
                      />
                    </Field>
                  </div>
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded accent-emerald-400"
                      checked={Boolean(item.current)}
                      onChange={(e) => update((c) => { c.jobExperience[index].current = e.target.checked; })}
                    />
                    <span className="text-sm text-slate-200">I am currently working here</span>
                  </label>
                  <Field label="Location">
                    <TextInput
                      value={item.location}
                      placeholder="Location (e.g. Remote · Bangladesh)"
                      onChange={(e) => update((c) => { c.jobExperience[index].location = e.target.value; })}
                    />
                  </Field>
                  <LinesEditor
                    label="Highlights (one per line)"
                    lines={item.highlights || []}
                    onChange={(lines) => update((c) => { c.jobExperience[index].highlights = lines; })}
                  />
                </CardEditor>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() => update((c) => { c.jobExperience.push({ role: '', company: '', startDate: '', endDate: '', current: false, location: '', highlights: [] }); })}
              >
                <FiPlus /> Add job
              </Button>
            </div>
          </div>
        );

      case 'About':
        return (
          <div className="flex flex-col gap-5">
            <Field label="Heading">
              <TextInput
                value={content.about.heading}
                onChange={(e) => update((c) => { c.about.heading = e.target.value; })}
              />
            </Field>
            <Field label="Paragraphs" hint="One paragraph per line">
              <TextArea
                value={content.about.paragraphs.join('\n\n')}
                onChange={(e) => update((c) => {
                  c.about.paragraphs = e.target.value.split('\n\n').map((p) => p.trim()).filter(Boolean);
                })}
              />
            </Field>
            <Field label="Career direction column title">
              <TextInput
                value={content.about.careerTitle}
                onChange={(e) => update((c) => { c.about.careerTitle = e.target.value; })}
              />
            </Field>
            {content.about.career.map((item, index) => (
              <CardEditor
                key={index}
                label={`Career item ${index + 1}`}
                onRemove={() => update((c) => { c.about.career.splice(index, 1); })}
              >
                <TextInput
                  value={item.title}
                  placeholder="Title"
                  onChange={(e) => update((c) => { c.about.career[index].title = e.target.value; })}
                />
                <TextArea
                  value={item.description}
                  placeholder="Description"
                  onChange={(e) => update((c) => { c.about.career[index].description = e.target.value; })}
                />
              </CardEditor>
            ))}
            <Button type="button" variant="secondary" onClick={() => update((c) => { c.about.career.push({ title: '', description: '' }); })}>
              <FiPlus /> Add career item
            </Button>
          </div>
        );

      case 'Skills':
        return (
          <div className="flex flex-col gap-6">
            {content.skills.map((group, groupIndex) => (
              <CardEditor
                key={groupIndex}
                label={`Skill group ${groupIndex + 1}`}
                onRemove={() => update((c) => { c.skills.splice(groupIndex, 1); })}
              >
                <TextInput
                  value={group.category}
                  placeholder="Category name"
                  onChange={(e) => update((c) => { c.skills[groupIndex].category = e.target.value; })}
                />
                <IconSelect
                  value={group.icon}
                  onChange={(value) => update((c) => { c.skills[groupIndex].icon = value; })}
                />

                <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
                  {group.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2">
                      <TextInput
                        value={item.name}
                        placeholder="Skill name"
                        onChange={(e) => update((c) => { c.skills[groupIndex].items[itemIndex].name = e.target.value; })}
                      />
                      <TextInput
                        type="number"
                        min="0"
                        max="100"
                        value={item.level}
                        className="!w-24 flex-none"
                        onChange={(e) => update((c) => { c.skills[groupIndex].items[itemIndex].level = Number(e.target.value); })}
                      />
                      <div className="w-40 flex-none">
                        <IconSelect
                          value={item.icon}
                          onChange={(value) => update((c) => { c.skills[groupIndex].items[itemIndex].icon = value; })}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => update((c) => { c.skills[groupIndex].items.splice(itemIndex, 1); })}
                        className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-red-400/20 bg-red-500/10 text-red-300 transition hover:bg-red-500/20"
                        aria-label="Remove skill"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => update((c) => { c.skills[groupIndex].items.push({ name: '', level: 50, icon: '' }); })}
                  >
                    <FiPlus /> Add skill
                  </Button>
                </div>
              </CardEditor>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() => update((c) => { c.skills.push({ category: 'New group', icon: '', items: [] }); })}
            >
              <FiPlus /> Add skill group
            </Button>
          </div>
        );

      case 'Education':
        return (
          <div className="flex flex-col gap-5">
            {content.education.map((item, index) => (
              <CardEditor
                key={index}
                label={`Education ${index + 1}`}
                onRemove={() => update((c) => { c.education.splice(index, 1); })}
              >
                <TextInput
                  value={item.year}
                  placeholder="Year (e.g. 2022 - 2026)"
                  onChange={(e) => update((c) => { c.education[index].year = e.target.value; })}
                />
                <TextInput
                  value={item.title}
                  placeholder="Degree / certificate"
                  onChange={(e) => update((c) => { c.education[index].title = e.target.value; })}
                />
                <TextInput
                  value={item.institution}
                  placeholder="Institution"
                  onChange={(e) => update((c) => { c.education[index].institution = e.target.value; })}
                />
                <TextArea
                  value={item.description}
                  placeholder="Description"
                  onChange={(e) => update((c) => { c.education[index].description = e.target.value; })}
                />
              </CardEditor>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() => update((c) => { c.education.push({ year: '', title: '', institution: '', description: '' }); })}
            >
              <FiPlus /> Add education entry
            </Button>
          </div>
        );

      case 'Research':
        return (
          <div className="flex flex-col gap-5">
            <Field label="Thesis">
              <TextArea
                value={content.research.thesis}
                onChange={(e) => update((c) => { c.research.thesis = e.target.value; })}
              />
            </Field>
            <Field label="Publication">
              <TextArea
                value={content.research.publication}
                onChange={(e) => update((c) => { c.research.publication = e.target.value; })}
              />
            </Field>
            <Field label="Journal / venue">
              <TextInput
                value={content.research.journal}
                onChange={(e) => update((c) => { c.research.journal = e.target.value; })}
              />
            </Field>
            <Field label="Summary">
              <TextArea
                value={content.research.summary}
                onChange={(e) => update((c) => { c.research.summary = e.target.value; })}
              />
            </Field>
          </div>
        );

      case 'Experience':
        return (
          <div className="flex flex-col gap-5">
            {content.experience.map((item, index) => (
              <CardEditor
                key={index}
                label={`Experience ${index + 1}`}
                onRemove={() => update((c) => { c.experience.splice(index, 1); })}
              >
                <TextInput
                  value={item.role}
                  placeholder="Role"
                  onChange={(e) => update((c) => { c.experience[index].role = e.target.value; })}
                />
                <TextInput
                  value={item.company}
                  placeholder="Company / organization"
                  onChange={(e) => update((c) => { c.experience[index].company = e.target.value; })}
                />
                <TextInput
                  value={item.timeline}
                  placeholder="Timeline"
                  onChange={(e) => update((c) => { c.experience[index].timeline = e.target.value; })}
                />
                <TextArea
                  value={item.summary}
                  placeholder="Summary"
                  onChange={(e) => update((c) => { c.experience[index].summary = e.target.value; })}
                />
              </CardEditor>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() => update((c) => { c.experience.push({ role: '', company: '', timeline: '', summary: '' }); })}
            >
              <FiPlus /> Add experience entry
            </Button>

            <LinesEditor
              label="Clubs & memberships"
              lines={content.memberships}
              onChange={(lines) => update((c) => { c.memberships = lines; })}
            />
          </div>
        );

      case 'Projects':
        return (
          <ProjectsEditor
            content={content}
            update={update}
          />
        );

      case 'Contact & Footer':
        return (
          <div className="flex flex-col gap-5">
            <Field label="Contact heading">
              <TextInput
                value={content.contact.heading}
                onChange={(e) => update((c) => { c.contact.heading = e.target.value; })}
              />
            </Field>
            <Field label="Contact subheading">
              <TextArea
                value={content.contact.subheading}
                onChange={(e) => update((c) => { c.contact.subheading = e.target.value; })}
              />
            </Field>
            <Field label="Email address">
              <TextInput
                type="email"
                value={content.contact.email}
                onChange={(e) => update((c) => { c.contact.email = e.target.value; })}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="GitHub URL">
                <TextInput
                  value={content.contact.githubUrl}
                  placeholder="https://github.com/…"
                  onChange={(e) => update((c) => { c.contact.githubUrl = e.target.value; })}
                />
              </Field>
              <Field label="LinkedIn URL">
                <TextInput
                  value={content.contact.linkedinUrl}
                  placeholder="https://linkedin.com/in/…"
                  onChange={(e) => update((c) => { c.contact.linkedinUrl = e.target.value; })}
                />
              </Field>
            </div>
            <div className="border-t border-white/10 pt-5">
              <Field label="Footer name">
                <TextInput
                  value={content.footer.name}
                  onChange={(e) => update((c) => { c.footer.name = e.target.value; })}
                />
              </Field>
              <Field label="Footer copyright">
                <TextInput
                  value={content.footer.copyright}
                  onChange={(e) => update((c) => { c.footer.copyright = e.target.value; })}
                />
              </Field>
            </div>
          </div>
        );

      case 'Links':
        return (
          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-3 text-sm font-medium text-slate-300">Social links</p>
              {content.socialLinks.map((link, index) => (
                <div key={index} className="mb-3 flex items-center gap-2">
                  <TextInput
                    value={link.label}
                    placeholder="Label"
                    onChange={(e) => update((c) => { c.socialLinks[index].label = e.target.value; })}
                  />
                  <TextInput
                    value={link.href}
                    placeholder="#contact or https://…"
                    onChange={(e) => update((c) => { c.socialLinks[index].href = e.target.value; })}
                  />
                  <div className="w-40 flex-none">
                    <IconSelect
                      value={link.icon}
                      onChange={(value) => update((c) => { c.socialLinks[index].icon = value; })}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => update((c) => { c.socialLinks.splice(index, 1); })}
                    className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-red-400/20 bg-red-500/10 text-red-300 transition hover:bg-red-500/20"
                    aria-label="Remove link"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() => update((c) => { c.socialLinks.push({ label: '', href: '', icon: '' }); })}
              >
                <FiPlus /> Add social link
              </Button>
            </div>

            <div className="border-t border-white/10 pt-5">
              <p className="mb-3 text-sm font-medium text-slate-300">Navigation links</p>
              {content.quickLinks.map((link, index) => (
                <div key={index} className="mb-3 flex items-center gap-2">
                  <TextInput
                    value={link.label}
                    placeholder="Label"
                    onChange={(e) => update((c) => { c.quickLinks[index].label = e.target.value; })}
                  />
                  <TextInput
                    value={link.href}
                    placeholder="#about"
                    onChange={(e) => update((c) => { c.quickLinks[index].href = e.target.value; })}
                  />
                  <button
                    type="button"
                    onClick={() => update((c) => { c.quickLinks.splice(index, 1); })}
                    className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-red-400/20 bg-red-500/10 text-red-300 transition hover:bg-red-500/20"
                    aria-label="Remove link"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() => update((c) => { c.quickLinks.push({ label: '', href: '' }); })}
              >
                <FiPlus /> Add navigation link
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  }, [activeTab, content]);

  if (loading) {
    return (
      <div className="glass rounded-[28px] border border-white/10 p-10 text-center text-slate-400">
        Loading content…
      </div>
    );
  }

  if (!content) {
    return (
      <div className="glass rounded-[28px] border border-red-400/20 bg-red-500/10 p-10 text-center text-red-200">
        {error || 'Failed to load content.'}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                activeTab === tab
                  ? 'bg-cyan-400 font-semibold text-slate-950'
                  : 'border border-white/10 bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <Button type="button" onClick={handleSave} disabled={saving}>
          <FiSave /> {saving ? 'Saving…' : 'Save Content'}
        </Button>
      </div>

      {message ? (
        <p className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="mb-5 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      ) : null}

      <div className="glass rounded-[28px] border border-white/10 p-6 sm:p-8">{tabContent}</div>
    </div>
  );
}
