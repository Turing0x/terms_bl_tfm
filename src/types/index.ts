export interface Meta {
  titulo: string
  version: string
  fuente: string
  autora: string
  tutora: string
  universidad: string
  totalTerminos: number
  totalGrupos: number
}

export interface Grupo {
  id: string
  nombre: string
  subtitulo: string
  emoji: string
  color: string
  terminosPrincipales: string[]
  terminosSecundarios: string[]
}

export interface Relacion {
  desde: string
  hasta: string
  tipo: string
  descripcion?: string
}

export interface Termino {
  id: string
  nombre: string
  tipo: 'principal' | 'secundario'
  grupo: string
  definicionCorta: string
  explicacion: string
  relacionados: string[]
  apareceComo: string[]
}

export interface Glosario {
  meta: Meta
  grupos: Grupo[]
  relaciones: Relacion[]
  terminos: Termino[]
}

export interface PasoKit {
  numero: number
  titulo: string
  descripcion: string
  terminosLinked: string[]
  colorAcento: string
}

export interface KitExtraccion {
  id: string
  nombre: string
  fabricante: string
  principio: string
  pasos: PasoKit[]
  ventajaClave: string
  limitacionClave: string
  terminoGlosario: string
}

export interface Tecnica {
  id: string
  nombre: string
  nivel: 'campo' | 'regional' | 'referencia'
  animacion: string
  lod: string
  tiempo: string
  coste: string
  escenario: string
  terminoGlosario: string
}
