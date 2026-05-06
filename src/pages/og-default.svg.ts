import type { APIRoute } from 'astro'

// Japanese pastel minimal OG card — Enso + sakura petal motif
export const GET: APIRoute = ({ url }) => {
  const params = new URL(url).searchParams
  const title = (params.get('title') || 'quizdee').slice(0, 80)
  const subtitle = (params.get('subtitle') || 'แบบทดสอบบุคลิกภาพ ฉบับคนไทย').slice(0, 120)
  const eyebrow = (params.get('eyebrow') || '季節 · BANGKOK · EST. 2026').slice(0, 60)

  const esc = (s: string) => s.replace(/[<>&"']/g, c => ({ '<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&#39;' }[c]!))

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FAF7F2"/>
      <stop offset="1" stop-color="#F3EDE3"/>
    </linearGradient>
    <radialGradient id="petal" cx="0.5" cy="0.4">
      <stop offset="0" stop-color="#F4C9D2"/>
      <stop offset="1" stop-color="#E8B4C2"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- enso right side -->
  <g transform="translate(900,315)" opacity="0.85">
    <path d="M 0 -180 A 180 180 0 1 1 130 124" stroke="#1A1A1A" stroke-width="14" stroke-linecap="round" fill="none"/>
    <path d="M 0 -90 C -38 -68 -38 -22 0 0 C 38 -22 38 -68 0 -90 Z" fill="url(#petal)"/>
    <circle cx="0" cy="-45" r="6" fill="#9B6B7A"/>
  </g>

  <!-- thin top divider -->
  <line x1="80" y1="80" x2="280" y2="80" stroke="#C9BCA9" stroke-width="1"/>
  <line x1="80" y1="550" x2="280" y2="550" stroke="#C9BCA9" stroke-width="1"/>

  <!-- eyebrow -->
  <text x="80" y="115" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="22" letter-spacing="3" fill="#7C7064">${esc(eyebrow.toUpperCase())}</text>

  <!-- main title -->
  <text x="80" y="280" font-family="'Fraunces', 'IBM Plex Sans Thai Looped', serif" font-size="84" font-weight="500" fill="#2A2724" letter-spacing="-1">${esc(title)}</text>

  <!-- subtitle -->
  <text x="80" y="360" font-family="'IBM Plex Sans Thai Looped', system-ui, sans-serif" font-size="32" font-weight="400" fill="#5C544B">${esc(subtitle)}</text>

  <!-- bottom brand line -->
  <text x="80" y="535" font-family="'Fraunces', serif" font-size="36" font-weight="600" fill="#1A1A1A">quizdee<tspan fill="#E8B4C2">.</tspan></text>
  <text x="80" y="565" font-family="'JetBrains Mono', monospace" font-size="14" letter-spacing="2" fill="#9B9085">QUIZDEE.COM</text>
</svg>`

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
