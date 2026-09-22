/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 40px rgba(99, 102, 241, 0.35)',
      },
      backgroundImage: {
        'radial-neon': 'radial-gradient(circle at top, rgba(99,102,241,0.35), transparent 42%), radial-gradient(circle at 20% 20%, rgba(59,130,246,0.22), transparent 25%), radial-gradient(circle at 80% 0%, rgba(168,85,247,0.24), transparent 22%)',
      },
    },
  },
  plugins: [],
};