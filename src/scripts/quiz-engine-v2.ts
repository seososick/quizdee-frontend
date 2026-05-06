/**
 * Quiz Engine v2 — supports a-e (5-option) multi-archetype weighted scoring.
 * No backend required. Pure client-side state machine + localStorage progress.
 *
 * Scoring: sum option.weight[archetype_code] across all answered questions.
 * Result = highest-scoring archetype. Ties resolved by archetype order in data.archetypes.
 *
 * For burnout-style diagnostic tier quizzes: data.archetypes have score_range,
 * and we sum a numeric score from option.weight (a single key like {EE:2,DP:1}) instead.
 */

export type QuizQuestion = {
  order: number
  text: string
  options: Array<{
    key: string  // 'a' | 'b' | 'c' | 'd' | 'e'
    label: string
    weight: Record<string, number>
  }>
}

export type QuizArchetype = {
  code: string
  name_th: string
  emoji?: string
  tagline_th?: string
  description_th?: string
  score_range?: [number, number]  // for diagnostic tier (burnout)
  [k: string]: any
}

export type QuizDataV2 = {
  slug: string
  title_th: string
  emoji?: string
  scoring?: 'highest-archetype' | 'tier-by-score'  // default: highest-archetype
  questions: QuizQuestion[]
  archetypes: QuizArchetype[]
}

type State = 'intro' | 'question' | 'submitting' | 'error'
const STORAGE = (slug: string) => `quizdee:v2:${slug}:answers`

export function runEngineV2(root: HTMLElement, quiz: QuizDataV2) {
  if (!quiz?.questions?.length || !quiz?.archetypes?.length) {
    showState(root, 'error')
    setError(root, 'แบบทดสอบยังไม่พร้อม')
    return
  }

  let current = 0
  // answers: { [questionOrder]: optionKey }
  let answers: Record<number, string> = loadProgress(quiz.slug) || {}
  if (Object.keys(answers).length > 0 && Object.keys(answers).length < quiz.questions.length) {
    current = Object.keys(answers).length
  }

  showState(root, 'intro')
  bindStart()
  bindRetry()

  function bindStart() {
    root.querySelector('[data-action="start"]')?.addEventListener('click', () => {
      showState(root, 'question')
      render()
    })
  }
  function bindRetry() {
    root.querySelector('[data-action="retry"]')?.addEventListener('click', () => {
      answers = {}
      current = 0
      saveProgress(quiz.slug, answers)
      showState(root, 'question')
      render()
    })
  }

  function render() {
    const q = quiz.questions[current]
    if (!q) return submit()

    const total = quiz.questions.length
    const num = current + 1
    const pct = Math.round((num / total) * 100)

    setText(root, '[data-progress-text]', `${num}/${total}`)
    setText(root, '[data-progress-percent]', `${pct}%`)
    const bar = root.querySelector('[data-progress-bar]') as HTMLElement | null
    if (bar) bar.style.width = `${pct}%`
    setText(root, '[data-question-text]', q.text)

    const opts = root.querySelector('[data-options]') as HTMLElement | null
    if (!opts) return
    opts.innerHTML = ''

    q.options.forEach((opt) => {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'opt-btn group flex items-start gap-3 w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-sumi-900 bg-washi-50 hover:bg-butter-100 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0_0_rgba(31,26,20,0.95)] active:scale-[0.98] transition-all duration-150 min-h-[60px]'
      btn.innerHTML = `
        <span class="flex-shrink-0 w-8 h-8 rounded-full bg-sumi-900 text-butter-300 font-mono font-bold text-small flex items-center justify-center group-hover:bg-coral-500 group-hover:text-white transition-colors">${opt.key.toUpperCase()}</span>
        <span class="flex-1 text-body text-sumi-900 leading-snug pt-0.5">${escape(opt.label)}</span>
      `
      btn.addEventListener('click', () => {
        answers[q.order] = opt.key
        saveProgress(quiz.slug, answers)
        current++
        if (current >= total) submit()
        else render()
      })
      opts.appendChild(btn)
    })

    // Encouragement at midway
    const enc = root.querySelector('[data-encouragement]') as HTMLElement | null
    if (enc) {
      if (num === Math.ceil(total / 2)) enc.textContent = 'ผ่านครึ่งทางแล้ว 🌱'
      else if (num === total) enc.textContent = 'ข้อสุดท้ายแล้ว ✨'
      else enc.textContent = ''
    }
  }

  function submit() {
    showState(root, 'submitting')
    try {
      const winner = score(quiz, answers)
      localStorage.removeItem(STORAGE(quiz.slug))
      const url = `/quiz/${quiz.slug}/result/${winner.toLowerCase().replace(/_/g, '-')}/`
      setTimeout(() => { window.location.href = url }, 600)
    } catch (e) {
      console.error('scoring error', e)
      showState(root, 'error')
      setError(root, 'ไม่สามารถคำนวณผลได้')
    }
  }
}

function score(quiz: QuizDataV2, answers: Record<number, string>): string {
  // Aggregate weights
  const totals: Record<string, number> = {}
  for (const q of quiz.questions) {
    const optKey = answers[q.order]
    if (!optKey) continue
    const opt = q.options.find(o => o.key === optKey)
    if (!opt) continue
    for (const [k, v] of Object.entries(opt.weight)) {
      totals[k] = (totals[k] || 0) + v
    }
  }

  // Tier-by-score (burnout): sum all values, find archetype whose score_range contains it
  if (quiz.scoring === 'tier-by-score') {
    const sum = Object.values(totals).reduce((a, b) => a + b, 0)
    for (const a of quiz.archetypes) {
      if (a.score_range && sum >= a.score_range[0] && sum <= a.score_range[1]) return a.code
    }
    return quiz.archetypes[0].code
  }

  // MBTI 4-axis: pick highest of each pair → 4-letter code
  if (quiz.scoring === 'mbti-4axis') {
    const pick = (a: string, b: string) => (totals[a] || 0) >= (totals[b] || 0) ? a : b
    const code = pick('E', 'I') + pick('S', 'N') + pick('T', 'F') + pick('J', 'P')
    // match archetype.code OR archetype.mbti field
    const match = quiz.archetypes.find(a => a.code === code || (a as any).mbti === code)
    return match ? match.code : code
  }

  // Highest archetype
  let best = quiz.archetypes[0].code
  let bestScore = -Infinity
  for (const a of quiz.archetypes) {
    const s = totals[a.code] || 0
    if (s > bestScore) {
      bestScore = s
      best = a.code
    }
  }
  return best
}

function showState(root: HTMLElement, st: State) {
  root.querySelectorAll('[data-state]').forEach(el => {
    el.classList.toggle('hidden', el.getAttribute('data-state') !== st)
  })
}
function setText(root: HTMLElement, sel: string, val: string) {
  const el = root.querySelector(sel)
  if (el) el.textContent = val
}
function setError(root: HTMLElement, msg: string) {
  const el = root.querySelector('[data-error-msg]')
  if (el) el.textContent = msg
}
function loadProgress(slug: string) {
  try { const v = localStorage.getItem(STORAGE(slug)); return v ? JSON.parse(v) : null } catch { return null }
}
function saveProgress(slug: string, a: any) {
  try { localStorage.setItem(STORAGE(slug), JSON.stringify(a)) } catch {}
}
function escape(s: string) {
  return s.replace(/[<>&"']/g, c => ({ '<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&#39;' }[c]!))
}
