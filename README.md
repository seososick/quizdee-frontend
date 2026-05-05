# Quizdee Frontend (Astro)

Static site generator for **[quizdee.com](https://quizdee.com)** — consumes the [quizdee-cms](https://github.com/seososick/quizdee-cms) Payload API at build time.

## Stack
- Astro 5 (static SSG)
- Tailwind CSS v3 + custom design tokens
- TypeScript strict
- Build-time fetch from Payload (no runtime API calls)
- Lighthouse target: SEO 100, Perf 90+, A11y 95+

## Design system
**Warm Soft + Duolingo accent** — Cream base + Coral primary (#E66B5C) + Fraunces serif display.
See [Design Strategy](https://github.com/seososick/quizdee/blob/main/02-Design-Strategy.md) (Obsidian).

## Page types (10)
- `/` — Homepage
- `/quiz/` — Quiz index
- `/quiz/[slug]/` — Quiz play
- `/quiz/[slug]/result/[typeCode]/` — Shareable result
- `/mbti/` — MBTI pillar hub
- `/mbti/[type]/` — 16 MBTI type pages
- `/category/[slug]/` — Category landing
- `/blog/`, `/blog/[slug]/` — Blog
- `/fun/` — Fun quiz hub
- `/about/`, `/contact/`, `/privacy/`, `/terms/` — Utility pages

## Local dev

```bash
cp .env.example .env
# Set PAYLOAD_API_URL to your running Payload instance
npm install
npm run dev
# → http://localhost:4321
```

## Build & deploy

```bash
npm run build
# → ./dist/  (static HTML)
```

On Cloudways, point Apache/Nginx `public_html` to `dist/`.

## Performance budget
- LCP < 1.8s on 4G mobile
- CLS < 0.02 (banner slots reserve fixed height)
- INP < 150ms
- JS initial < 90KB

## Anti-AI-slop compliance
- ❌ No Tailwind indigo (#6366f1, #4f46e5, etc.)
- ❌ No two-stop trust gradient on hero
- ❌ No emoji in h*, button, .icon
- ✅ Display = Fraunces serif (var(--font-display))
- ✅ Body = IBM Plex Sans Thai Looped
- ✅ State coverage: loading / empty / error / populated / edge

---
**License:** MIT
