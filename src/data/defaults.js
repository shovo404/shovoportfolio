// Default site content. Everything here can be overridden from the admin panel
// (stored in the Supabase `site_content` table). Icons are referenced by name —
// see src/lib/icons.jsx for the available options.

export const DEFAULT_CONTENT = {
  profile: {
    name: 'Shahriar Ahmed Shovo',
    title: 'AI Enthusiast | CSE Graduate | Web Developer | Extension Developer',
    bio:
      'Passionate Computer Science & Engineering graduate focused on Artificial Intelligence, Deep Learning, Web Development, Automation Tools, and innovative digital solutions. Interested in research, AI systems, and building modern scalable technologies.',
    availability: 'Open for freelance, research, and product collaborations.',
  },

  hero: {
    badge: 'Available for freelance, research, and AI-driven product work',
    eyebrow: 'Premium AI portfolio',
    headingPre: 'Building futuristic digital experiences for',
    headingHighlight: 'AI, web, and automation',
    headingPost: '',
    focusedLabel: 'Currently focused on',
    highlights: [
      'AI systems',
      'Deep learning',
      'Automation tools',
      'Web development',
      'Extension development',
    ],
    quickTags: ['AI Enthusiast', 'Research-driven', 'Freelancer', 'Extension Developer'],
    heroImages: [
      '/photo_2026-05-09%2004.51.31.jpeg',
      '/photo_2026-05-09%2004.51.35.jpeg',
      '/photo_2026-05-09%2004.51.27.jpeg',
      '/photo_2025-12-14%2007.58.00.jpeg',
      '/photo_2025-07-26%2014.03.32.jpeg',
      '/photo_2025-06-06%2003.04.48.jpeg',
      '/20260104_200221.jpg',
      '/IMG20221107123836.jpg',
    ],
  },

  stats: [
    { value: '3', label: 'Education milestones' },
    { value: '1', label: 'Published paper' },
    { value: '5', label: 'Project families' },
    { value: '4', label: 'Memberships & experiences' },
  ],

  about: {
    eyebrow: 'About',
    heading: 'Research-minded builder with a product-first mindset.',
    paragraphs: [
      'I am a Computer Science & Engineering graduate who likes turning ideas into elegant systems that feel immediate, intelligent, and useful.',
      'My work spans AI experimentation, interface design, automation, and scalable front-end engineering with a strong focus on clarity and practical outcomes.',
      'I am especially interested in research that bridges model performance with explainability, and in building digital products that feel polished and future-ready.',
    ],
    careerTitle: 'Career direction',
    career: [
      {
        title: 'AI and deep learning',
        description: 'Building applied AI systems with a focus on practical value, performance, and explainability.',
      },
      {
        title: 'Web and extension development',
        description: 'Designing modern interfaces and browser tools that feel fast, stable, and visually premium.',
      },
      {
        title: 'Freelance solutions',
        description: 'Helping clients automate repeated tasks and present their products with a strong digital presence.',
      },
    ],
  },

  skills: [
    {
      category: 'Programming & AI',
      icon: 'FaBrain',
      items: [
        { name: 'Python', level: 94, icon: 'SiPython' },
        { name: 'Machine Learning', level: 88, icon: 'FaRobot' },
        { name: 'Deep Learning', level: 86, icon: 'SiTensorflow' },
        { name: 'Computer Vision', level: 84, icon: 'FaBrain' },
        { name: 'Prompt Engineering', level: 82, icon: 'FaRobot' },
        { name: 'Scikit-learn', level: 85, icon: 'FaBrain' },
      ],
    },
    {
      category: 'Web & Design',
      icon: 'SiReact',
      items: [
        { name: 'React.js', level: 91, icon: 'SiReact' },
        { name: 'HTML5 / CSS3', level: 95, icon: 'SiTailwindcss' },
        { name: 'JavaScript ES6', level: 92, icon: 'SiJavascript' },
        { name: 'WordPress', level: 80, icon: 'SiWordpress' },
        { name: 'UI/UX', level: 84, icon: 'FaBrain' },
        { name: 'Photoshop / Illustrator', level: 78, icon: 'FaBrain' },
      ],
    },
    {
      category: 'Tools & Workflow',
      icon: 'FaGlobe',
      items: [
        { name: 'GitHub', level: 92, icon: 'FaGithub' },
        { name: 'VS Code', level: 96, icon: 'FaGlobe' },
        { name: 'PyCharm', level: 86, icon: 'FaGlobe' },
        { name: 'Android Studio', level: 76, icon: 'FaGlobe' },
        { name: 'Packet Tracer', level: 74, icon: 'FaGlobe' },
        { name: 'XAMPP / Anaconda', level: 84, icon: 'FaGlobe' },
      ],
    },
  ],

  education: [
    {
      year: '2022 - 2026',
      title: 'B.Sc. in Computer Science & Engineering',
      institution: 'Daffodil International University',
      description: 'Focused on AI, software engineering, research methods, and modern web systems.',
    },
    {
      year: 'HSC',
      title: 'Higher Secondary Certificate',
      institution: 'Adamjee Cantonment College',
      description: 'Built a strong foundation in science, mathematics, and analytical thinking.',
    },
    {
      year: 'SSC',
      title: 'Secondary School Certificate',
      institution: 'Cantonment Public School & College',
      description: 'Developed curiosity for programming, problem solving, and technology.',
    },
  ],

  research: {
    eyebrow: 'Research',
    thesis: 'Brain Tumor Detection Using Deep CNN, Transfer Learning & Explainable AI',
    publication: 'Optimizing Soursop Leaf Disease Classification with a Lightweight Ensemble Model and Explainable AI',
    journal: 'Current Plant Biology, 2025',
    summary:
      'Research blends deep learning, interpretable models, and practical AI deployment patterns with a focus on transparency and useful impact.',
  },

  projects: [
    {
      title: 'AI Clip Generator',
      description: 'Generates short-form content workflows with AI-assisted scripting, editing, and output optimization.',
      tech: ['React', 'AI', 'Automation', 'Video Workflow'],
      accent: 'from-cyan-400/20 to-blue-500/20',
    },
    {
      title: 'Rule-Based Chatbot',
      description: 'A responsive conversational assistant designed for structured support, routing, and automation tasks.',
      tech: ['JavaScript', 'Logic Engine', 'UI/UX'],
      accent: 'from-violet-400/20 to-fuchsia-500/20',
    },
    {
      title: 'Browser Extension Projects',
      description: 'Productivity-focused browser extensions with clean interactions and practical everyday workflows.',
      tech: ['Extension APIs', 'React', 'Chrome'],
      accent: 'from-sky-400/20 to-indigo-500/20',
    },
    {
      title: 'AI & Web Solutions',
      description: 'Modern web solutions paired with AI-driven features for business, personal branding, and productivity.',
      tech: ['React', 'AI', 'Frontend Systems'],
      accent: 'from-emerald-400/20 to-cyan-500/20',
    },
    {
      title: 'Freelance Automation Tools',
      description: 'Time-saving tooling for client operations, repetitive work, and digital process automation.',
      tech: ['Python', 'Automation', 'Freelance'],
      accent: 'from-amber-400/20 to-orange-500/20',
    },
  ],

  projectsSection: {
    eyebrow: 'Projects',
    title: 'A showcase built to feel like a modern product launch page.',
    subtitle: 'Each project card includes the full presentation stack: thumbnail, description, tech stack, and action buttons.',
  },

  jobExperienceSection: {
    eyebrow: 'Job Experience',
    title: 'Roles that shaped the craft.',
    subtitle: 'From freelance automation to research-driven development — a live look at the roles behind the work.',
  },

  jobExperience: [
    {
      role: 'AI & Web Automation Freelancer',
      company: 'Independent / Remote',
      timeline: '2024 - Present',
      location: 'Remote · Bangladesh',
      highlights: [
        'Automates repetitive client workflows with Python scripts and custom tooling.',
        'Ships AI-assisted dashboards and web interfaces tailored to business needs.',
        'Pairs practical AI features with clean, fast, and reliable frontend systems.',
      ],
    },
    {
      role: 'Student Associate',
      company: 'Creative International (Daffodil Group)',
      timeline: '2023 - Present',
      location: 'Dhaka, Bangladesh',
      highlights: [
        'Contributes to structured learning tracks, collaboration, and professional exposure.',
        'Works with product-facing teams on technology-driven ideas and deliverables.',
      ],
    },
    {
      role: 'Browser Extension Developer',
      company: 'Independent Projects',
      timeline: '2024 - Present',
      location: 'Remote',
      highlights: [
        'Designs productivity-focused Chrome extensions with clean interactions.',
        'Builds extension features that automate everyday workflows end-to-end.',
      ],
    },
  ],

  experience: [
    {
      role: 'Student Associate',
      company: 'Creative International (Daffodil Group)',
      timeline: 'Academic / Professional Development',
      summary: 'Supports structured learning, collaboration, and practical exposure to professional workflows.',
    },
  ],

  memberships: [
    '4IR Research Lab',
    'Computer & Programming Club',
    'Cyber Security Club',
  ],

  contact: {
    heading: 'Let’s build something intelligent.',
    subheading:
      'For freelance work, collaboration, thesis discussions, or extension development inquiries, reach out and I’ll respond with a focused next step.',
    email: 'shovo@example.com',
    githubUrl: '',
    linkedinUrl: '',
  },

  socialLinks: [
    { label: 'GitHub', href: '#contact', icon: 'FaGithub' },
    { label: 'LinkedIn', href: '#contact', icon: 'FaLinkedinIn' },
    { label: 'Email', href: '#contact', icon: 'FaEnvelope' },
    { label: 'Portfolio', href: '#hero', icon: 'FaGlobe' },
  ],

  quickLinks: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],

  footer: {
    name: 'Shahriar Ahmed Shovo',
    copyright: '© 2026 Shahriar Ahmed Shovo. All rights reserved.',
  },
};

// Deep merge saved content over defaults so new fields never break old rows.
export function mergeContent(saved) {
  if (!saved || typeof saved !== 'object') return structuredClone(DEFAULT_CONTENT);

  const merged = structuredClone(DEFAULT_CONTENT);

  for (const [key, value] of Object.entries(saved)) {
    if (value === null || value === undefined) continue;

    if (Array.isArray(value)) {
      merged[key] = value;
    } else if (typeof value === 'object') {
      merged[key] = { ...merged[key], ...value };
    } else {
      merged[key] = value;
    }
  }

  return merged;
}
