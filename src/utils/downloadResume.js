const CUSTOM_CV_URL = '/cv.pdf';
const FALLBACK_FILE = 'Shahriar-Ahmed-Shovo-CV.pdf';
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 45;

const COLOR_INK = [16, 24, 48];
const COLOR_MUTED = [76, 91, 130];
const COLOR_ACCENT = [37, 99, 235];
const COLOR_CYAN = [8, 145, 178];
const COLOR_LINE = [226, 232, 240];

export async function downloadResume(content) {
  const customCv = await findCustomCv();
  if (customCv) {
    triggerDownload(customCv, FALLBACK_FILE);
    return;
  }

  const { jsPDF } = await import('jspdf');
  const doc = buildCvPdf(content || {}, jsPDF);
  doc.save(FALLBACK_FILE);
}

async function findCustomCv() {
  try {
    const response = await fetch(CUSTOM_CV_URL, { method: 'HEAD' });
    if (!response.ok) return null;

    const type = (response.headers.get('content-type') || '').toLowerCase();
    if (type && /pdf|octet-stream/.test(type)) return CUSTOM_CV_URL;
  } catch (error) {
    // Ignore network errors — fall back to generated PDF.
  }
  return null;
}

function triggerDownload(url, filename) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function buildCvPdf(content, jsPDF) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });

  const profile = content.profile || {};
  const education = content.education || [];
  const research = content.research || {};
  const skillsGroups = content.skills || [];
  const contact = content.contact || {};

  let y = MARGIN + 24;

  // Accent stripe
  doc.setFillColor(...COLOR_ACCENT);
  doc.rect(0, 0, 7, PAGE_H, 'F');

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(...COLOR_INK);
  doc.text(profile.name || 'Shahriar Ahmed Shovo', MARGIN, y);

  y += 18;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...COLOR_CYAN);
  const titleLines = doc.splitTextToSize(
    profile.title || 'AI Enthusiast | CSE Graduate | Web Developer',
    PAGE_W - MARGIN * 2,
  );
  doc.text(titleLines, MARGIN, y);

  y += titleLines.length * 15 + 4;
  doc.setFontSize(10);
  doc.setTextColor(...COLOR_MUTED);
  const availabilityLines = doc.splitTextToSize(profile.availability || '', PAGE_W - MARGIN * 2);
  doc.text(availabilityLines, MARGIN, y);

  y += availabilityLines.length * 13 + 8;
  doc.setDrawColor(...COLOR_LINE);
  doc.setLineWidth(1);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 20;

  const ensureSpace = (needed) => {
    if (y > PAGE_H - 140 - needed) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const sectionHeading = (title) => {
    ensureSpace(60);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...COLOR_ACCENT);
    doc.text(title.toUpperCase(), MARGIN, y);
    doc.setFillColor(...COLOR_ACCENT);
    doc.rect(MARGIN, y + 5, 26, 2, 'F');
    y += 24;
  };

  const bodyText = (text, size = 10.5, color = COLOR_INK) => {
    if (!text) return;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, PAGE_W - MARGIN * 2);
    for (const line of lines) {
      ensureSpace(14);
      doc.text(line, MARGIN, y);
      y += 14;
    }
    y += 6;
  };

  const metaText = (text) => {
    if (!text) return;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...COLOR_MUTED);
    const lines = doc.splitTextToSize(text, PAGE_W - MARGIN * 2);
    for (const line of lines) {
      doc.text(line, MARGIN, y);
      y += 12;
    }
    y += 2;
  };

  // Profile
  if (profile.bio) {
    sectionHeading('Profile');
    bodyText(profile.bio);
  }

  // Education
  if (education.length) {
    sectionHeading('Education');
    education.forEach((item) => {
      ensureSpace(46);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...COLOR_INK);
      doc.text(item.title || '', MARGIN, y);
      y += 13;
      metaText(`${item.institution || ''}${item.year ? `  ·  ${item.year}` : ''}`);
      bodyText(item.description);
      y += 2;
    });
  }

  // Research
  if (research.thesis || research.publication) {
    sectionHeading('Research');
    if (research.thesis) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(...COLOR_INK);
      doc.text('Thesis', MARGIN, y);
      y += 13;
      bodyText(research.thesis);
    }
    if (research.publication) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(...COLOR_INK);
      doc.text('Publication', MARGIN, y);
      y += 13;
      bodyText(research.publication);
      metaText(research.journal);
    }
    bodyText(research.summary);
  }

  // Skills
  const skillNames = skillsGroups
    .flatMap((group) => (group.items || []).map((item) => item.name))
    .filter(Boolean);
  if (skillNames.length) {
    sectionHeading('Core Skills');
    bodyText(skillNames.join('  ·  '));
  }

  // Contact
  const contacts = [
    contact.email && `Email: ${contact.email}`,
    contact.githubUrl && `GitHub: ${contact.githubUrl}`,
    contact.linkedinUrl && `LinkedIn: ${contact.linkedinUrl}`,
  ].filter(Boolean);
  if (contacts.length) {
    sectionHeading('Contact');
    contacts.forEach((line) => bodyText(line, 10));
  }

  // Footer page numbers
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i += 1) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...COLOR_MUTED);
    doc.text(`Page ${i} of ${pages}`, PAGE_W - MARGIN - 64, PAGE_H - 24);
  }

  return doc;
}