// Generate default OG image as SVG (build-time, lightweight)
// For per-page dynamic OG, use Cloudflare Worker or similar in production
import type { APIRoute } from 'astro'

export const prerender = true

export const GET: APIRoute = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBF9F4"/>
      <stop offset="100%" stop-color="#F5F2E9"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="80" y="120" font-family="Fraunces, Georgia, serif" font-weight="500" font-size="20" fill="#6E665A" letter-spacing="3">EST. 2026 · BANGKOK</text>
  <text x="80" y="280" font-family="Fraunces, Georgia, serif" font-weight="600" font-size="84" fill="#1F1A14">เข้าใจตัวเอง</text>
  <text x="80" y="380" font-family="Fraunces, Georgia, serif" font-style="italic" font-weight="400" font-size="84" fill="#A85950">ผ่านแบบทดสอบที่เขียนด้วยใจ</text>
  <text x="80" y="500" font-family="Inter, system-ui, sans-serif" font-weight="500" font-size="32" fill="#403A30">MBTI · Love Language · Personality</text>
  <text x="80" y="560" font-family="Fraunces, Georgia, serif" font-weight="600" font-size="40" fill="#1F1A14">quizdee.com</text>
  <circle cx="1100" cy="540" r="18" fill="#D88A82"/>
</svg>`

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400, immutable',
    },
  })
}
