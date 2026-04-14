// Progreso de estudio — persistencia en localStorage
// Usado únicamente desde client-side scripts (no en Astro server-side)

const KEY = 'bioglosario-dominados'

export function getDominados(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set()
  } catch {
    return new Set()
  }
}

export function toggleDominado(id: string): boolean {
  const set = getDominados()
  if (set.has(id)) {
    set.delete(id)
  } else {
    set.add(id)
  }
  localStorage.setItem(KEY, JSON.stringify([...set]))
  return set.has(id)
}

export function isDominado(id: string): boolean {
  return getDominados().has(id)
}

export function getProgreso(total: number): { dominados: number; total: number; pct: number } {
  const dominados = getDominados().size
  return { dominados, total, pct: total > 0 ? Math.round((dominados / total) * 100) : 0 }
}
