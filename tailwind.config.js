/** @type {import('tailwindcss').Config} */
export default {
content: ['./index.html', './*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0C1115',
        surface: '#131B21',
        raised: '#19232A',
        line: '#243038',
        fg: '#E8EEF1',
        muted: '#8A9AA5',
        amber: { DEFAULT: '#F2B94B', dim: '#3A2F17' },
        mint: { DEFAULT: '#4FD1B0', dim: '#12302B' },
        coral: { DEFAULT: '#F2735F', dim: '#3A1E1A' },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Instrument Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'translateY(-10%)', opacity: '0' },
          '15%': { opacity: '1' },
          '85%': { opacity: '1' },
          '100%': { transform: 'translateY(110%)', opacity: '0' },
        },
      },
      animation: { sweep: 'sweep 3.6s ease-in-out infinite' },
    },
  },
  plugins: [],
};
