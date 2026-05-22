/**
 * Quiz Catalog — Single source of truth for all quizzes
 * Used by: homepage, /quiz/ catalog, sitemap, structured data
 * Order matters: featured at top
 */

export type QuizCategory =
  | 'PERSONALITY'
  | 'PSYCHOLOGY'
  | 'LOVE'
  | 'WORK'
  | 'TREND'
  | 'POP_CULTURE'
  | 'CULTURE'
  | 'LIFESTYLE'
  | 'WELLBEING'

export interface CatalogEntry {
  slug: string
  title_th: string
  subtitle_th: string
  category: QuizCategory
  category_label_th: string
  emoji: string
  duration_min: number
  question_count: number
  bg: string  // Tailwind bg class
  badge?: string
  rotate?: -2 | -1 | 0 | 1 | 2
  featured?: boolean
  source_files: {
    meta: string
    archetypes: string
    questions: string
  }
}

export const CATALOG: CatalogEntry[] = [
  // ─── Personality (4) ─────────────────────────────────────
  {
    slug: 'mbti', title_th: 'MBTI 16 บุคลิก',
    subtitle_th: 'ฉบับสั้น 14 ข้อ — รู้ผลใน 4 นาที',
    category: 'PERSONALITY', category_label_th: 'บุคลิกภาพ',
    emoji: '🌙', duration_min: 4, question_count: 14,
    bg: 'bg-butter-100', badge: 'ฮิตสุด', rotate: -1, featured: true,
    source_files: { meta: 'mbti-16-meta.json', archetypes: '16-archetypes.json', questions: 'mbti-16-questions.json' },
  },
  {
    slug: 'big-five', title_th: 'Big Five OCEAN',
    subtitle_th: 'บุคลิกภาพฉบับนักจิตวิทยาสถามจริง',
    category: 'PSYCHOLOGY', category_label_th: 'จิตวิทยา',
    emoji: '🧠', duration_min: 4, question_count: 15,
    bg: 'bg-asagi-50', rotate: 0, featured: true,
    source_files: { meta: 'bigfive-meta.json', archetypes: 'bigfive-archetypes.json', questions: 'bigfive-questions.json' },
  },
  {
    slug: 'enneagram', title_th: 'Enneagram 9 ประเภท',
    subtitle_th: 'รู้ลึกถึงแรงขับใจในตัวคุณ',
    category: 'PERSONALITY', category_label_th: 'บุคลิกภาพ',
    emoji: '🔮', duration_min: 4, question_count: 14,
    bg: 'bg-infj-50', rotate: 1,
    source_files: { meta: 'enneagram-meta.json', archetypes: 'enneagram-archetypes.json', questions: 'enneagram-questions.json' },
  },
  {
    slug: 'cat-mbti', title_th: 'คุณเป็นแมว MBTI สายไหน?',
    subtitle_th: 'แมวเจ้าแผน หรือ แมวซีอีโอ?',
    category: 'PERSONALITY', category_label_th: 'แมว × MBTI',
    emoji: '🐈‍⬛', duration_min: 3, question_count: 12,
    bg: 'bg-coral-100', badge: 'ใหม่!', rotate: 1,
    source_files: { meta: 'cat-mbti-meta.json', archetypes: 'cat-mbti-archetypes.json', questions: 'cat-mbti-questions.json' },
  },

  // ─── Love (2) ────────────────────────────────────────────
  {
    slug: 'love-language', title_th: 'Love Language 5 รัก',
    subtitle_th: 'ส่งให้แฟนทำ! รู้วิธีรักของกันและกัน',
    category: 'LOVE', category_label_th: 'ความรัก',
    emoji: '💌', duration_min: 4, question_count: 15,
    bg: 'bg-esfj-50', rotate: -1,
    source_files: { meta: 'love-language-meta.json', archetypes: 'love-language-types.json', questions: 'love-language-questions.json' },
  },
  {
    slug: 'attachment-style', title_th: 'รักแบบไหน? Attachment Style',
    subtitle_th: 'ทำไมเรารักแบบนี้ — ฉบับวัยทำงาน',
    category: 'LOVE', category_label_th: 'ความรัก',
    emoji: '💙', duration_min: 4, question_count: 14,
    bg: 'bg-infp-50', rotate: 0,
    source_files: { meta: 'attachment-meta.json', archetypes: 'attachment-archetypes.json', questions: 'attachment-questions.json' },
  },

  // ─── Work (3) ────────────────────────────────────────────
  {
    slug: 'office-mbti', title_th: 'MBTI ในออฟฟิศไทย',
    subtitle_th: 'tag เพื่อนร่วมงาน แล้วเทียบกัน!',
    category: 'WORK', category_label_th: 'งาน',
    emoji: '💼', duration_min: 3, question_count: 12,
    bg: 'bg-matcha-100', rotate: -1,
    source_files: { meta: 'office-mbti-meta.json', archetypes: 'office-mbti-archetypes.json', questions: 'office-mbti-questions.json' },
  },
  {
    slug: 'burnout-risk', title_th: 'หมดไฟแล้วหรือยัง?',
    subtitle_th: 'Burnout Risk Test ฉบับคนทำงาน',
    category: 'WORK', category_label_th: 'งาน',
    emoji: '🔥', duration_min: 4, question_count: 14,
    bg: 'bg-entj-50', rotate: 1,
    source_files: { meta: 'burnout-meta.json', archetypes: 'burnout-archetypes.json', questions: 'burnout-questions.json' },
  },
  {
    slug: 'career-identity', title_th: 'ตัวตนสายอาชีพไหน?',
    subtitle_th: 'Corporate / Side / Nomad / Creator',
    category: 'WORK', category_label_th: 'งาน',
    emoji: '💼', duration_min: 4, question_count: 14,
    bg: 'bg-kincha-100', rotate: 0,
    source_files: { meta: 'career-id-meta.json', archetypes: 'career-id-archetypes.json', questions: 'career-id-questions.json' },
  },

  // ─── Wellbeing (1) ───────────────────────────────────────
  {
    slug: 'coping-style', title_th: 'รับมือความเครียดยังไง?',
    subtitle_th: 'Stress Coping Style ฉบับ working Thai',
    category: 'WELLBEING', category_label_th: 'สุขภาพจิต',
    emoji: '🌀', duration_min: 4, question_count: 14,
    bg: 'bg-asagi-100', rotate: 1,
    source_files: { meta: 'coping-meta.json', archetypes: 'coping-archetypes.json', questions: 'coping-questions.json' },
  },

  // ─── Pop Culture (2) ─────────────────────────────────────
  {
    slug: 'kdrama-mbti', title_th: 'MBTI × ซีรีส์เกาหลี',
    subtitle_th: 'ถ้าคุณเป็นตัวละคร… จะเป็นใคร?',
    category: 'POP_CULTURE', category_label_th: 'ซีรีส์เกาหลี',
    emoji: '👑', duration_min: 3, question_count: 12,
    bg: 'bg-ume-100', rotate: -1,
    source_files: { meta: 'kdrama-mbti-meta.json', archetypes: 'kdrama-mbti-archetypes.json', questions: 'kdrama-mbti-questions.json' },
  },
  {
    slug: 'kpop-bias-role', title_th: 'บิสของคุณคือตำแหน่งไหน?',
    subtitle_th: 'Leader / Vocal / Dancer / Visual / Maknae',
    category: 'POP_CULTURE', category_label_th: 'K-pop · T-pop',
    emoji: '🎤', duration_min: 3, question_count: 13,
    bg: 'bg-esfp-50', rotate: 0,
    source_files: { meta: 'kpop-bias-meta.json', archetypes: 'kpop-bias-archetypes.json', questions: 'kpop-bias-questions.json' },
  },

  // ─── Trend (2) ───────────────────────────────────────────
  {
    slug: 'ai-friend', title_th: 'คุณใช้ AI แบบไหน?',
    subtitle_th: 'Power User / Daily Helper / Skeptic',
    category: 'TREND', category_label_th: 'เทรนด์ 2025',
    emoji: '🤖', duration_min: 3, question_count: 13,
    bg: 'bg-intj-50', rotate: 1,
    source_files: { meta: 'ai-friend-meta.json', archetypes: 'ai-friend-archetypes.json', questions: 'ai-friend-questions.json' },
  },
  {
    slug: 'doomscroll-persona', title_th: 'สาย Doom Scroll แบบไหน?',
    subtitle_th: 'นักปรัชญา / Foodie / Gossip / Healer',
    category: 'TREND', category_label_th: 'เทรนด์ 2025',
    emoji: '📱', duration_min: 3, question_count: 13,
    bg: 'bg-coral-50', rotate: -1,
    source_files: { meta: 'doomscroll-meta.json', archetypes: 'doomscroll-archetypes.json', questions: 'doomscroll-questions.json' },
  },

  // ─── Lifestyle (2) ───────────────────────────────────────
  {
    slug: 'spending-style', title_th: 'Quiet Luxury หรือ Loud Budget?',
    subtitle_th: 'พฤติกรรมใช้เงินของคุณ',
    category: 'LIFESTYLE', category_label_th: 'ไลฟ์สไตล์',
    emoji: '💸', duration_min: 3, question_count: 13,
    bg: 'bg-enfj-50', rotate: 1,
    source_files: { meta: 'spending-meta.json', archetypes: 'spending-archetypes.json', questions: 'spending-questions.json' },
  },
  {
    slug: 'aesthetic-style', title_th: 'Aesthetic สายไหน?',
    subtitle_th: 'Clean Girl / Coquette / Y2K / Old Money',
    category: 'LIFESTYLE', category_label_th: 'ไลฟ์สไตล์',
    emoji: '🕯️', duration_min: 3, question_count: 13,
    bg: 'bg-isfp-50', rotate: 0,
    source_files: { meta: 'aesthetic-meta.json', archetypes: 'aesthetic-archetypes.json', questions: 'aesthetic-questions.json' },
  },

  // ─── Culture (1) ─────────────────────────────────────────
  {
    slug: 'mootelu-style', title_th: 'คุณเป็นสายมูแบบไหน?',
    subtitle_th: 'พระ / ไพ่ / ฮวงจุ้ย / ดวงดาว',
    category: 'CULTURE', category_label_th: 'วัฒนธรรมไทย',
    emoji: '✨', duration_min: 3, question_count: 13,
    bg: 'bg-ume-50', rotate: -1,
    source_files: { meta: 'mootelu-meta.json', archetypes: 'mootelu-archetypes.json', questions: 'mootelu-questions.json' },
  },
] as const

export const CATEGORIES: { code: QuizCategory; label_th: string; emoji: string; description_th: string }[] = [
  { code: 'PERSONALITY', label_th: 'บุคลิกภาพ',     emoji: '🌙', description_th: 'รู้จักตัวตนคุณลึกๆ' },
  { code: 'PSYCHOLOGY',  label_th: 'จิตวิทยาจริง',   emoji: '🧠', description_th: 'แบบทดสอบที่นักจิตวิทยายอมรับ' },
  { code: 'LOVE',        label_th: 'ความรัก',         emoji: '💌', description_th: 'รู้จักวิธีรักของคุณ' },
  { code: 'WORK',        label_th: 'งาน',             emoji: '💼', description_th: 'ตัวตนในออฟฟิศ' },
  { code: 'WELLBEING',   label_th: 'สุขภาพจิต',       emoji: '🌀', description_th: 'รู้สึกยังไง รับมือยังไง' },
  { code: 'POP_CULTURE', label_th: 'ป๊อปคัลเจอร์',   emoji: '👑', description_th: 'ซีรีส์ + ไอดอล' },
  { code: 'TREND',       label_th: 'เทรนด์ 2025',    emoji: '✨', description_th: 'เทรนด์ที่คนกำลังพูดถึง' },
  { code: 'LIFESTYLE',   label_th: 'ไลฟ์สไตล์',     emoji: '🕯️', description_th: 'รสนิยม + พฤติกรรมประจำวัน' },
  { code: 'CULTURE',     label_th: 'วัฒนธรรมไทย',   emoji: '🙏', description_th: 'สนุกแบบไทยๆ' },
]

export function getQuizBySlug(slug: string): CatalogEntry | undefined {
  return CATALOG.find(q => q.slug === slug)
}

export function getQuizzesByCategory(cat: QuizCategory): CatalogEntry[] {
  return CATALOG.filter(q => q.category === cat)
}
