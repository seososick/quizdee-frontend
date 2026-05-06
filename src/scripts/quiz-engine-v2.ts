/**
 * Quiz Engine v2 — supports a-e (5-option) multi-archetype weighted scoring.
 * No backend required. Pure client-side state machine + localStorage progress.
 *
 * Modes:
 * - mbti-4axis: pick highest of E/I, S/N, T/F, J/P → 4-letter code
 * - tier-by-score: sum all weights, pick archetype whose score_range contains it (burnout)
 * - highest-archetype (default): pick archetype with highest summed score
 *
 * v2.1: P1 polish — selected state, back button, abandon CTA, no intro state required.
 */

export type QuizQuestion = {
  order: number
  text: string
  options: Array<{
    key: string
    label: string
    weight: Record<string, number>
  }>
}

export type QuizArchetype = {
  code: string
  name_th: string
  emoji?: string
  tagline_th?: string
  score_range?: [number, number]
  [k: string]: any
}

export type QuizDataV2 = {
  slug: string
  title_th: string
  emoji?: string
  scoring?: 'highest-archetype' | 'tier-by-score' | 'mbti-4axis'
  questions: QuizQuestion[]
  archetypes: QuizArchetype[]
}

const STORAGE = (slug: string) => `quizdee:v2:${slug}:answers`

let engineInstance: { renderCurrent: () => void } | null = null

export function runEngineV2(root: HTMLElement, quiz: QuizDataV2) {
  if (!quiz?.questions?.length || !quiz?.archetypes?.length) {
    showState(root, 'error')
    setError(root, 'แบบทดสอบยังไม่พร้อม')
    return
  }

  let current = 0
  let answers: Record<number, string> = loadProgress(quiz.slug) || {}
  if (Object.keys(answers).length > 0 && Object.keys(answers).length < quiz.questions.length) {
    current = Object.keys(answers).length
  }

  // Default state: question (we skipped intro on the page)
  showState(root, 'question')

  // Bind retry/abandon
  root.querySelector('[data-action="retry"]')?.addEventListener('click', () => {
    answers = {}; current = 0; saveProgress(quiz.slug, answers)
    showState(root, 'question'); render()
  })
  root.querySelector('[data-action="abandon"]')?.addEventListener('click', () => {
    if (confirm('ออกจากแบบทดสอบ? ผลที่ทำไปแล้วจะถูกบันทึกไว้')) {
      window.location.href = '/'
    }
  })
  root.querySelector('[data-action="back"]')?.addEventListener('click', () => {
    if (current > 0) { current--; render() }
  })

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

    // Back button enable
    const backBtn = root.querySelector('[data-action="back"]') as HTMLButtonElement | null
    if (backBtn) backBtn.disabled = current === 0

    const opts = root.querySelector('[data-options]') as HTMLElement | null
    if (!opts) return
    opts.innerHTML = ''

    const previousAnswer = answers[q.order]

    q.options.forEach((opt) => {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.dataset.optKey = opt.key
      const isSelected = previousAnswer === opt.key

      btn.className = [
        'opt-btn group flex items-start gap-3 w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-150 min-h-[60px]',
        isSelected
          ? 'border-coral-700 bg-coral-50 shadow-[4px_4px_0_0_rgba(196,90,62,0.95)] -translate-y-0.5 -translate-x-0.5'
          : 'border-sumi-900 bg-washi-50 hover:bg-butter-100 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0_0_rgba(31,26,20,0.95)] active:scale-[0.98]',
      ].join(' ')

      const keyClass = isSelected
        ? 'flex-shrink-0 w-9 h-9 rounded-full bg-coral-500 text-white font-mono font-bold text-small flex items-center justify-center'
        : 'flex-shrink-0 w-9 h-9 rounded-full bg-sumi-900 text-butter-300 font-mono font-bold text-small flex items-center justify-center group-hover:bg-coral-500 group-hover:text-white transition-colors'

      btn.innerHTML = `
        <span class="${keyClass}">${isSelected ? '✓' : opt.key.toUpperCase()}</span>
        <span class="flex-1 text-body text-sumi-900 leading-snug pt-1">${escape(opt.label)}</span>
      `

      btn.addEventListener('click', () => {
        // Visual feedback (instant)
        const allBtns = opts.querySelectorAll('.opt-btn')
        allBtns.forEach((b) => {
          b.classList.remove('border-coral-700', 'bg-coral-50', 'shadow-[4px_4px_0_0_rgba(196,90,62,0.95)]', '-translate-y-0.5', '-translate-x-0.5')
          b.classList.add('border-sumi-900', 'bg-washi-50')
        })
        btn.classList.remove('border-sumi-900', 'bg-washi-50')
        btn.classList.add('border-coral-700', 'bg-coral-50', 'shadow-[4px_4px_0_0_rgba(196,90,62,0.95)]', '-translate-y-0.5', '-translate-x-0.5')

        // Save answer + advance after brief pause
        answers[q.order] = opt.key
        saveProgress(quiz.slug, answers)
        current++
        setTimeout(() => {
          if (current >= total) submit()
          else render()
        }, 280)
      })
      opts.appendChild(btn)
    })

    // Encouragement at milestones
    const enc = root.querySelector('[data-encouragement]') as HTMLElement | null
    if (enc) {
      if (num === Math.ceil(total / 2)) enc.textContent = 'ผ่านครึ่งทางแล้ว 🌱'
      else if (num === total - 2) enc.textContent = 'อีก 2 ข้อสุดท้าย ✨'
      else if (num === total) enc.textContent = 'ข้อสุดท้ายแล้ว 🎉'
      else enc.textContent = ''
    }

    // Smooth scroll to top of question
    const questionPanel = root.querySelector('[data-state="question"]') as HTMLElement | null
    if (questionPanel && current > 0) {
      questionPanel.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  function submit() {
    showState(root, 'submitting')
    try {
      const winner = score(quiz, answers)
      const url = `/quiz/${quiz.slug}/result/${winner.toLowerCase().replace(/_/g, '-')}/`
      // Keep answers in localStorage briefly so result page could show details (optional)
      setTimeout(() => { window.location.href = url }, 700)
    } catch (e) {
      console.error('scoring error', e)
      showState(root, 'error')
      setError(root, 'ไม่สามารถคำนวณผลได้')
    }
  }

  engineInstance = { renderCurrent: render }
  render()
}

function score(quiz: QuizDataV2, answers: Record<number, string>): string {
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

  if (quiz.scoring === 'tier-by-score') {
    const sum = Object.values(totals).reduce((a, b) => a + b, 0)
    for (const a of quiz.archetypes) {
      if (a.score_range && sum >= a.score_range[0] && sum <= a.score_range[1]) return a.code
    }
    return quiz.archetypes[0].code
  }

  if (quiz.scoring === 'mbti-4axis') {
    const pick = (a: string, b: string) => (totals[a] || 0) >= (totals[b] || 0) ? a : b
    const code = pick('E', 'I') + pick('S', 'N') + pick('T', 'F') + pick('J', 'P')
    const match = quiz.archetypes.find(a => a.code === code || (a as any).mbti === code)
    return match ? match.code : code
  }

  let best = quiz.archetypes[0].code
  let bestScore = -Infinity
  for (const a of quiz.archetypes) {
    const s = totals[a.code] || 0
    if (s > bestScore) { bestScore = s; best = a.code }
  }
  return best
}

function showState(root: HTMLElement, st: string) {
  root.querySelectorAll('[data-state]').forEach(el => {
    el.classList.toggle('hidden', el.getAttribute('data-state') !== st)
  })
}
function setText(root: HTMLElement, sel: string, val: string) {
  const el = root.querySelector(sel); if (el) el.textContent = val
}
function setError(root: HTMLElement, msg: string) {
  const el = root.querySelector('[data-error-msg]'); if (el) el.textContent = msg
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
