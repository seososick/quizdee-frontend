/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Quizdee Warm Soft palette (from Design Strategy v1.0)
        cream: {
          50: '#FFFBF5',
          100: '#F8F4ED',
          200: '#F0E8DA',
        },
        ink: {
          900: '#2A2826', // primary text — NOT pure black
          700: '#5A554F',
          500: '#8A847C',
          300: '#BDB7AE',
        },
        coral: {
          50: '#F8DCD7',
          400: '#E66B5C', // primary accent
          600: '#B8493D', // pressed/shadow
          900: '#7A2D24',
        },
        // MBTI category coding
        analyst: '#A18AB3', // mauve
        diplomat: '#8FA88E', // sage
        sentinel: '#C9A876', // sand
        explorer: '#7AAEC0', // sky
        // Semantic
        success: '#6B9F71',
        error: '#C45D54',
        warning: '#D4A04C',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['"IBM Plex Sans Thai Looped"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Type scale 1.25 multiplicative (per Open Design craft)
        'display': ['4rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h1': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'h2': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h3': ['1.5rem', { lineHeight: '1.25', letterSpacing: '-0.005em' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'small': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.04em' }],
      },
      borderRadius: {
        'card': '12px',
        'btn': '10px',
      },
      boxShadow: {
        // Subtle press shadow (NOT chunky duolingo for warm-soft feel)
        'press': '0 2px 0 0 rgb(184 73 61 / 0.5)',
        'card': '0 1px 3px 0 rgb(42 40 38 / 0.06), 0 1px 2px 0 rgb(42 40 38 / 0.04)',
      },
    },
  },
  plugins: [],
}
