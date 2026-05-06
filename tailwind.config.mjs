/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // ─────────────────────────────────────────────────────────
        // Japanese Pastel Minimal — 和風 (Wafu)
        // Inspired by 紙 (kami / paper) + 季節 (seasonal palette)
        // Mobile-first: high contrast on small screens, restrained on desktop
        // ─────────────────────────────────────────────────────────

        // Surface — washi paper neutrals (warm off-whites, slightly cool grays)
        washi: {
          50:  '#FBF9F4',  // 生成 (kinari) — primary background
          100: '#F5F2E9',  // 砂色 (suna-iro) — sand
          200: '#EDE8DC',  // 鳥の子 (torinoko) — egg shell
          300: '#DDD5C2',  // muted divider
        },
        sumi: {
          // 墨 — ink, never pure black
          900: '#1F1A14',  // primary ink
          700: '#403A30',  // secondary ink
          500: '#6E665A',  // muted text
          400: '#8A8276',  // captions
          300: '#B0A89A',  // disabled
          200: '#D4CDBF',  // subtle borders
        },

        // Seasonal accents — soft pastel set
        sakura: {
          // 桜 — cherry blossom (primary brand accent — soft pink, NOT loud)
          50:  '#FBF1F1',
          100: '#F7E2E0',
          300: '#EBB7B0',
          500: '#D88A82',  // primary CTA
          700: '#A85950',  // pressed
        },
        matcha: {
          // 抹茶 — soft green for diplomat/success
          50:  '#F1F4ED',
          100: '#E2EAD7',
          300: '#B9C99F',
          500: '#8FA770',
          700: '#5E7242',
        },
        kincha: {
          // 金茶 — golden tea, autumn warm
          50:  '#FAF3E7',
          100: '#F2E5C8',
          300: '#D9B97F',
          500: '#B5904D',
          700: '#7E6128',
        },
        // ─── Playful hybrid layer (Yellow primary + Coral secondary) ───
        butter: {
          // 🌼 butter yellow — primary playful CTA, ooopenlab-vibe
          50:  '#FEF8E2',
          100: '#FCEFC2',
          300: '#F9DD83',
          500: '#F4C95D',  // primary CTA on cards
          600: '#E5B431',
          700: '#B88B1F',
        },
        coral: {
          // 🌸 soft coral — secondary accent, friendly highlight
          50:  '#FFF1ED',
          100: '#FFDFD3',
          300: '#FFB59E',
          500: '#FF8A6B',  // hot accent (.dot in logo, hover)
          700: '#C45A3E',
        },
        // ─── 16 MBTI per-type pastel accents (one color per personality) ───
        intj: { 50: '#EEF1F8', 500: '#5B6CA6' },  // deep blue
        intp: { 50: '#F0F1F5', 500: '#7B7E96' },  // muted slate
        entj: { 50: '#FCEEEA', 500: '#C95F47' },  // commander red
        entp: { 50: '#FAF1DC', 500: '#C99A3D' },  // debater amber
        infj: { 50: '#F2EEF8', 500: '#7E6BA8' },  // mystic purple
        infp: { 50: '#FBEFF5', 500: '#C277A1' },  // dreamer rose
        enfj: { 50: '#FCF1E9', 500: '#D08856' },  // warm coach
        enfp: { 50: '#FFF6DC', 500: '#E4B637' },  // sunshine
        istj: { 50: '#EEF2F0', 500: '#5E7A70' },  // forest
        isfj: { 50: '#FBF1EE', 500: '#C28475' },  // soft brick
        estj: { 50: '#F4ECE8', 500: '#9C6E5A' },  // earth
        esfj: { 50: '#FFEEF1', 500: '#E37B92' },  // host pink
        istp: { 50: '#EEF1F4', 500: '#6B7E92' },  // cool steel
        isfp: { 50: '#F2F1EC', 500: '#998E70' },  // moss
        estp: { 50: '#FFEFE6', 500: '#FF8A4B' },  // adrenaline
        esfp: { 50: '#FFEDF6', 500: '#F072AC' },  // disco
        asagi: {
          // 浅葱 — soft blue-green (water)
          50:  '#EEF4F3',
          100: '#D8E5E2',
          300: '#9DBCB7',
          500: '#638F89',
          700: '#3B5F5B',
        },
        ume: {
          // 梅 — plum, autumn cool
          50:  '#F4ECEF',
          100: '#E7D5DD',
          300: '#C49AAB',
          500: '#94627B',
          700: '#623B53',
        },

        // Semantic (still derived from seasonal palette)
        success: '#8FA770',    // matcha-500
        error:   '#B5573D',    // burnt orange (NOT alarming red)
        warning: '#B5904D',    // kincha-500
      },

      fontFamily: {
        // Fraunces (serif) for Latin display + IBM Plex Sans Thai for Thai display
        // (Fraunces doesn't support Thai — Plex Thai handles it gracefully)
        display: ['Fraunces', '"IBM Plex Sans Thai Looped"', 'Georgia', 'serif'],
        body:    ['"IBM Plex Sans Thai Looped"', 'Inter', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },

      fontSize: {
        // Mobile-first scale (1.2 multiplier — restrained for small screens)
        // md+ scales up via custom utility
        'display':   ['2.5rem',  { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-lg':['4rem',    { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'h1':        ['2rem',    { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'h1-lg':     ['3rem',    { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'h2':        ['1.5rem',  { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'h2-lg':     ['2rem',    { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
        'h3':        ['1.25rem', { lineHeight: '1.35', letterSpacing: '-0.005em' }],
        'body':      ['1rem',    { lineHeight: '1.7',  letterSpacing: '0' }],     // 1.7 for Thai readability
        'small':     ['0.875rem',{ lineHeight: '1.6',  letterSpacing: '0.01em' }],
        'caption':   ['0.75rem', { lineHeight: '1.5',  letterSpacing: '0.06em' }],
      },

      spacing: {
        // 4-base scale (Japanese ma — 間 — restraint)
        '18': '4.5rem',
        '22': '5.5rem',
      },

      borderRadius: {
        'paper': '4px',     // restrained — Japanese minimal
        'card':  '8px',
        'btn':   '6px',
      },

      boxShadow: {
        // Subtle paper-on-paper shadows (no chunky duolingo press)
        'paper': '0 1px 0 0 rgb(31 26 20 / 0.04), 0 1px 3px 0 rgb(31 26 20 / 0.04)',
        'card':  '0 1px 2px 0 rgb(31 26 20 / 0.04), 0 4px 12px -2px rgb(31 26 20 / 0.05)',
        'press': '0 1px 0 0 rgb(168 89 80 / 0.4)',
      },

      maxWidth: {
        'reading': '38rem',   // 608px — optimal Thai reading width
      },

      transitionTimingFunction: {
        'soft': 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
