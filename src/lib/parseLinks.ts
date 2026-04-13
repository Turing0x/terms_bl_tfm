import { getTerminoById } from './glosario'

export function parseLinks(texto: string): string {
  return texto.replace(/\[\[([^\]]+)\]\]/g, (_, id) => {
    const termino = getTerminoById(id)
    if (!termino) return id
    return `<span
      class="term-link"
      data-id="${termino.id}"
      data-tipo="${termino.tipo}"
      data-grupo="${termino.grupo}"
    >${termino.nombre}</span>`
  })
}
