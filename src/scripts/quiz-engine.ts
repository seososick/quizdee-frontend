/**
 * Quiz Engine — pure client-side state machine.
 * Supports MBTI 4-axis, sum-buckets, highest-score scoring methods.
 */

export type Question = {
  id: string
  text: string
  type: 'single' | 'multi' | 'slider' | 'image'
  options: Array<{
    label: string
    image?: { url: string }
    weights: Record<string, number>
  }>
}

export type Result = {
  id: string
  typeCode: string
  title: string
}

export type QuizData = {
  slug: string
  title: string
  scoringMethod: 'mbti-4axis' | 'sum-buckets' | 'highest-score'
  questions: Question[]
  results: Result[]
}

type State = 'loading' | 'intro' | 'question' | 'submitting' | 'error'

const STORAGE_KEY = (slug: string) => `quizdee:quiz:${slug}:answers`

export function runQuizEngine(root: HTMLElement, quiz: QuizData) {
  if (!quiz?.questions?.length) {
    showState(root, 'error')
    setError(root, 'แบบทดสอบยังไม่พร้อม')
    return
  }

  let currentIndex = 0
  let answers: Record<string, Record<string, number>> = loadProgress(quiz.slug) || {}

  // If progress exists, jump to first unanswered question
  const answeredCount = Object.keys(answers).length
  if (answeredCount > 0 && answeredCount < quiz.questions.length) {
    currentIndex = answeredCount
  }

  // Show intro state
  showState(root, 'intro')

  // Bind start button
  root.querySelector('[data-action="start"]')?.addEventListener('click', () => {
    showState(root, 'question')
    renderQuestion()
  })

  // Bind retry button
  root.querySelector('[data-action="retry"]')?.addEventListener('click', () => {
    answers = {}
    currentIndex = 0
    saveProgress(quiz.slug, answers)
    showState(root, 'question')
    renderQuestion()
  })

  function renderQuestion() {
    const q = quiz.questions[currentIndex]
    if (!q) {
      submit()
      return
    }

    const total = quiz.questions.length
    const num = currentIndex + 1
    const pct = Math.round((num / total) * 100)

    const progressText = root.querySelector('[data-progress-text]')
    const progressPercent = root.querySelector('[data-progress-percent]')
    const progressBar = root.querySelector('[data-progress-bar]') as HTMLElement | null
    const questionText = root.querySelector('[data-question-text]')
    const optionsContainer = root.querySelector('[data-options]')

    if (progressText) progressText.textContent = `คำถามที่ ${num} จาก ${total}`
    if (progressPercent) progressPercent.textContent = `${pct}%`
    if (progressBar) progressBar.style.width = `${pct}%`
    if (questionText) questionText.textContent = q.text

    if (optionsContainer) {
      optionsContainer.innerHTML = ''
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button')
        btn.type = 'button'
        btn.className =
          'block w-full text-left p-4 rounded-card border border-ink-300/30 bg-cream-50 hover:border-coral-400 hover:bg-coral-50/30 transition-colors'
        btn.textContent = opt.label
        btn.addEventListener('click', () => {
          answers[q.id] = opt.weights
          saveProgress(quiz.slug, answers)
          currentIndex++
          if (currentIndex >= total) {
            submit()
          } else {
            renderQuestion()
          }
        })
        optionsContainer.appendChild(btn)
      })
    }
  }

  function submit() {
    showState(root, 'submitting')
    try {
      const winner = scoreAnswers(quiz, answers)
      // Clear progress
      localStorage.removeItem(STORAGE_KEY(quiz.slug))
      // Navigate to result page
      const url = `/quiz/${quiz.slug}/result/${winner}/`
      setTimeout(() => {
        window.location.href = url
      }, 400)
    } catch (err) {
      console.error('Quiz scoring failed:', err)
      showState(root, 'error')
      setError(root, 'ไม่สามารถประมวลผลคำตอบได้ กรุณาลองใหม่')
    }
  }
}

function scoreAnswers(
  quiz: QuizData,
  answers: Record<string, Record<string, number>>,
): string {
  const totals: Record<string, number> = {}

  for (const q of quiz.questions) {
    const a = answers[q.id]
    if (!a) continue
    for (const [k, v] of Object.entries(a)) {
      totals[k] = (totals[k] || 0) + v
    }
  }

  if (quiz.scoringMethod === 'mbti-4axis') {
    // 4 axes: E vs I, S vs N, T vs F, J vs P
    const code =
      (totals.E || 0) >= (totals.I || 0) ? 'E' : 'I'
    const code2 = (totals.S || 0) >= (totals.N || 0) ? 'S' : 'N'
    const code3 = (totals.T || 0) >= (totals.F || 0) ? 'T' : 'F'
    const code4 = (totals.J || 0) >= (totals.P || 0) ? 'J' : 'P'
    return `${code}${code2}${code3}${code4}`
  }

  // sum-buckets and highest-score: pick highest-scoring key
  let best = ''
  let bestScore = -Infinity
  for (const [k, v] of Object.entries(totals)) {
    if (v > bestScore) {
      best = k
      bestScore = v
    }
  }
  return best || 'unknown'
}

function showState(root: HTMLElement, state: State) {
  root.querySelectorAll('[data-state]').forEach((el) => {
    if (el.getAttribute('data-state') === state) {
      el.classList.remove('hidden')
    } else {
      el.classList.add('hidden')
    }
  })
}

function setError(root: HTMLElement, msg: string) {
  const el = root.querySelector('[data-error-msg]')
  if (el) el.textContent = msg
}

function loadProgress(slug: string) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(slug))
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveProgress(slug: string, answers: object) {
  try {
    localStorage.setItem(STORAGE_KEY(slug), JSON.stringify(answers))
  } catch {
    /* quota / privacy mode — ignore */
  }
}
