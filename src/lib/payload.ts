/**
 * Payload CMS API client for Astro build-time fetching.
 * All routes are static (SSG) — fetched at `astro build` time.
 */

const API_BASE = import.meta.env.PAYLOAD_API_URL || 'http://localhost:3001/api'

export interface Quiz {
  id: string
  title: string
  slug: string
  description: string
  category: 'personality' | 'love' | 'career' | 'fun'
  estimatedMinutes: number
  scoringMethod: 'mbti-4axis' | 'sum-buckets' | 'highest-score'
  questions: Question[]
  results: Result[]
  heroImage?: { url: string; alt: string }
  status: 'draft' | 'published' | 'archived'
  publishedAt?: string
}

export interface Question {
  id: string
  text: string
  type: 'single' | 'multi' | 'slider' | 'image'
  options: Array<{
    label: string
    image?: { url: string }
    weights: Record<string, number>
  }>
  category?: string
}

export interface Result {
  id: string
  typeCode: string
  title: string
  emoji?: string
  shortDescription: string
  longDescription?: any // lexical rich text
  strengths?: Array<{ item: string }>
  weaknesses?: Array<{ item: string }>
  matchTypes?: string[]
  category: 'mbti' | 'love-language' | 'fun' | 'other'
  heroImage?: { url: string; alt: string }
  famousPeople?: Array<{ name: string; role?: string; isThai?: boolean }>
  thaiContext?: any
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  metaDescription: string
  answerBlock: string
  content: any
  category: string
  tags?: string[]
  heroImage?: { url: string; alt: string }
  relatedQuiz?: Quiz[]
  relatedResults?: Result[]
  faq?: Array<{ question: string; answer: string }>
  author?: { id: string; email: string; name?: string }
  status: 'draft' | 'published' | 'archived'
  publishedAt?: string
}

async function fetchPayload<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE}${endpoint}`
  try {
    const res = await fetch(url)
    if (!res.ok) {
      console.error(`[payload] ${res.status} ${url}`)
      // Empty fallback so build doesn't crash if CMS not yet seeded
      return { docs: [], totalDocs: 0 } as any
    }
    return await res.json()
  } catch (err) {
    console.error(`[payload] fetch failed: ${url}`, err)
    return { docs: [], totalDocs: 0 } as any
  }
}

interface PayloadList<T> {
  docs: T[]
  totalDocs: number
  hasNextPage: boolean
  nextPage?: number
}

export async function getQuizzes(): Promise<Quiz[]> {
  const res = await fetchPayload<PayloadList<Quiz>>(
    '/quizzes?where[status][equals]=published&depth=2&limit=100',
  )
  return res.docs
}

export async function getQuizBySlug(slug: string): Promise<Quiz | null> {
  const res = await fetchPayload<PayloadList<Quiz>>(
    `/quizzes?where[slug][equals]=${encodeURIComponent(slug)}&depth=2&limit=1`,
  )
  return res.docs[0] || null
}

export async function getResults(): Promise<Result[]> {
  const res = await fetchPayload<PayloadList<Result>>('/results?depth=1&limit=200')
  return res.docs
}

export async function getResultByTypeCode(typeCode: string): Promise<Result | null> {
  const res = await fetchPayload<PayloadList<Result>>(
    `/results?where[typeCode][equals]=${encodeURIComponent(typeCode)}&depth=1&limit=1`,
  )
  return res.docs[0] || null
}

export async function getMbtiTypes(): Promise<Result[]> {
  const res = await fetchPayload<PayloadList<Result>>(
    '/results?where[category][equals]=mbti&depth=1&limit=20',
  )
  return res.docs
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const res = await fetchPayload<PayloadList<BlogPost>>(
    '/blog-posts?where[status][equals]=published&depth=1&limit=100&sort=-publishedAt',
  )
  return res.docs
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await fetchPayload<PayloadList<BlogPost>>(
    `/blog-posts?where[slug][equals]=${encodeURIComponent(slug)}&depth=2&limit=1`,
  )
  return res.docs[0] || null
}
