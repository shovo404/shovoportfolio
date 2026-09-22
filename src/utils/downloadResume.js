export function downloadResume(name) {
  const html = `
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>${name} Resume</title>
        <style>
          body { font-family: Arial, sans-serif; background: #0b1020; color: #e5eefc; padding: 40px; }
          h1 { color: #7dd3fc; margin-bottom: 8px; }
          h2 { color: #c4b5fd; margin-top: 28px; margin-bottom: 8px; }
          .muted { color: #94a3b8; }
          .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(148,163,184,0.2); border-radius: 16px; padding: 18px; }
        </style>
      </head>
      <body>
        <h1>${name}</h1>
        <p class="muted">AI Enthusiast | CSE Graduate | Web Developer | Extension Developer</p>
        <div class="card">
          <p>Passionate about AI systems, deep learning, modern web experiences, automation tools, and scalable digital solutions.</p>
          <h2>Highlights</h2>
          <ul>
            <li>B.Sc. in Computer Science & Engineering - Daffodil International University (2022-2026)</li>
            <li>Research: Brain Tumor Detection Using Deep CNN, Transfer Learning & Explainable AI</li>
            <li>Publication: Current Plant Biology, 2025</li>
          </ul>
        </div>
      </body>
    </html>
  `;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${name.toLowerCase().replace(/\s+/g, '-')}-resume.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
