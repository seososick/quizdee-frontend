/**
 * Quiz Content Loader — uses import.meta.glob (Vite-native, build-time, reliable)
 * Loads all quiz JSON files at build time so getStaticPaths works deterministically.
 */

// import.meta.glob with `eager: true` returns all matched files synchronously at build
const allFiles = import.meta.glob('../data/quiz-content/*.json', { eager: true, import: 'default' }) as Record<string, any>

function getFile(filename: string): any {
  // filename like 'mbti-16-meta.json' → key '../data/quiz-content/mbti-16-meta.json'
  const key = `../data/quiz-content/${filename}`
  return allFiles[key] ?? null
}

export function loadMeta(file: string) {
  return getFile(file) ?? {}
}

export function loadArchetypes(file: string): any[] {
  const data = getFile(file)
  return Array.isArray(data) ? data : []
}

export function loadQuestions(file: string): any[] {
  const data = getFile(file)
  return Array.isArray(data) ? data : []
}

/** Get archetype code in normalized form (used for URL slugs) */
export function archetypeCode(a: any): string {
  return (a.code || a.mbti || a.name_en?.toUpperCase()?.replace(/\s+/g, '_') || 'UNKNOWN')
}

export function archetypeUrlSlug(a: any): string {
  return archetypeCode(a).toLowerCase().replace(/_/g, '-')
}

export function archetypeName(a: any): string {
  return a.name_th || a.archetype_name_th || a.cat_name_th || a.office_role_th || a.kdrama_role_th || a.code || ''
}
