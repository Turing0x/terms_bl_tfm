import data from '../mock/glosario_biopsialiquida.json'
import type { Glosario, Termino, Grupo, Relacion } from '../types'

const glosario = data as Glosario

export const getMeta = () => glosario.meta

export const getTerminos = (): Termino[] => glosario.terminos
export const getGrupos = (): Grupo[] => glosario.grupos
export const getRelaciones = (): Relacion[] => glosario.relaciones

export const getTerminoById = (id: string): Termino | undefined =>
  glosario.terminos.find(t => t.id === id)

export const getGrupoById = (id: string): Grupo | undefined =>
  glosario.grupos.find(g => g.id === id)

export const getTerminosByGrupo = (grupoId: string): Termino[] =>
  glosario.terminos.filter(t => t.grupo === grupoId)

export const getRelacionesByTermino = (id: string): Relacion[] =>
  glosario.relaciones.filter(r => r.desde === id || r.hasta === id)

export const buscarTerminos = (query: string): Termino[] => {
  const q = query.toLowerCase()
  return glosario.terminos.filter(t =>
    t.nombre.toLowerCase().includes(q) ||
    t.definicionCorta.toLowerCase().includes(q)
  )
}

export const getRelacionados = (id: string): Termino[] => {
  const termino = getTerminoById(id)
  if (!termino) return []
  return termino.relacionados
    .map(rid => getTerminoById(rid))
    .filter((t): t is Termino => t !== undefined)
}
