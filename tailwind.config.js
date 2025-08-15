/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-light': '#ffffff',
        'bg-dark': '#1a1a1a',
        'text-primary': '#1a1a1a',
        'text-secondary': '#666666',
        'accent': '#0070f3',
        'border-light': '#e5e5e5',
      },
      fontFamily: {
        'accent': ['AccentFont', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero-sm': ['3rem', { lineHeight: '0.85' }],
        'hero-md': ['4rem', { lineHeight: '0.85' }],
        'hero-lg': ['5rem', { lineHeight: '0.85' }],
        'hero-xl': ['6rem', { lineHeight: '0.85' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
  plugins: [],
}