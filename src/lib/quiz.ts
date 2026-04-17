// Quiz Mode — generación de preguntas y lógica de puntuación
// Usado únicamente desde client-side scripts

export type QuizMode = 'flashcard' | 'def-to-term' | 'term-to-def'

export interface QuizTerm {
  id: string
  nombre: string
  tipo: string
  grupo: string
  definicionCorta: string
}

export interface Question {
  mode: QuizMode
  termId: string
  termNombre: string
  prompt: string      // lo que se muestra al usuario
  answer: string      // respuesta correcta
  options: string[]   // [respuesta correcta + 3 distractores] barajados (solo MC)
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Devuelve `n` distractores para un término dado.
 *  Prioriza términos del mismo grupo; completa con otros grupos si faltan. */
export function getDistractors(
  term: QuizTerm,
  allTerms: QuizTerm[],
  mode: QuizMode,
  n = 3,
): string[] {
  const others = allTerms.filter(t => t.id !== term.id)
  const sameGroup  = shuffle(others.filter(t => t.grupo === term.grupo))
  const otherGroup = shuffle(others.filter(t => t.grupo !== term.grupo))
  const pool = [...sameGroup, ...otherGroup].slice(0, n)

  return pool.map(t => mode === 'def-to-term' ? t.nombre : t.definicionCorta)
}

/** Genera preguntas barajadas para un conjunto de términos. */
export function generateQuestions(
  terms: QuizTerm[],
  allTerms: QuizTerm[],
  mode: QuizMode,
): Question[] {
  const questions: Question[] = terms.map(term => {
    if (mode === 'flashcard') {
      return {
        mode,
        termId: term.id,
        termNombre: term.nombre,
        prompt: term.nombre,
        answer: term.definicionCorta,
        options: [],
      }
    }

    if (mode === 'def-to-term') {
      const distractors = getDistractors(term, allTerms, mode)
      return {
        mode,
        termId: term.id,
        termNombre: term.nombre,
        prompt: term.definicionCorta,
        answer: term.nombre,
        options: shuffle([term.nombre, ...distractors]),
      }
    }

    // term-to-def
    const distractors = getDistractors(term, allTerms, mode)
    return {
      mode,
      termId: term.id,
      termNombre: term.nombre,
      prompt: term.nombre,
      answer: term.definicionCorta,
      options: shuffle([term.definicionCorta, ...distractors]),
    }
  })

  return shuffle(questions)
}
