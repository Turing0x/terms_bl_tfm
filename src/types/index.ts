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
