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

export const kitsExtraccion: KitExtraccion[] = [
  {
    id: 'kit-qiAamp',
    nombre: 'QIAamp Circulating Nucleic Acid',
    fabricante: 'Qiagen',
    principio: 'columna-silice',
    pasos: [
      { numero: 1, titulo: 'Lisis caotrópica', descripcion: 'Se añade tampón con cloruro de guanidinio al plasma. El agente caotrópico desnaturaliza proteínas y DNAsas, liberando el cfDNA.', terminosLinked: ['tampones-lisis-caotropica', 'dnasas-plasmaticas', 'cfDNA'], colorAcento: '#00e5ff' },
      { numero: 2, titulo: 'Unión a la membrana', descripcion: 'La mezcla pasa por la columna de membrana de sílice. En presencia de alta salinidad, el cfDNA se une a la membrana. Los contaminantes fluyen a través.', terminosLinked: ['columna-membrana-silice'], colorAcento: '#39ff14' },
      { numero: 3, titulo: 'Lavados', descripcion: 'Dos lavados sucesivos eliminan sales residuales, lípidos y proteínas sin despegar el cfDNA de la membrana.', terminosLinked: [], colorAcento: '#ffb300' },
      { numero: 4, titulo: 'Elución', descripcion: 'Se añade tampón de baja salinidad o agua. La afinidad del cfDNA por la sílice se revierte y el ADN se libera purificado en un volumen de 20-100 µL.', terminosLinked: ['fragmento-nucleosomal'], colorAcento: '#b388ff' }
    ],
    ventajaClave: 'Estándar de referencia más validado. Alta reproducibilidad.',
    limitacionClave: 'Requiere 1-4 mL de plasma. Protocolo de ~3 h. Coste elevado.',
    terminoGlosario: 'columna-membrana-silice'
  },
  {
    id: 'kit-magmax',
    nombre: 'MagMAX Cell-Free DNA',
    fabricante: 'Thermo Fisher',
    principio: 'particulas-magneticas',
    pasos: [
      { numero: 1, titulo: 'Lisis caotrópica', descripcion: 'El plasma se mezcla con tampón caotrópico que desnaturaliza proteínas y detiene la actividad de las DNAsas.', terminosLinked: ['tampones-lisis-caotropica', 'dnasas-plasmaticas'], colorAcento: '#00e5ff' },
      { numero: 2, titulo: 'Captura magnética', descripcion: 'Se añaden partículas magnéticas recubiertas de sílice. El cfDNA se une a su superficie. Se aplica un imán externo que retiene las partículas; el sobrenadante con contaminantes se aspira.', terminosLinked: ['particulas-magneticas', 'cfDNA'], colorAcento: '#39ff14' },
      { numero: 3, titulo: 'Lavados con imán', descripcion: 'Con el imán activo, se añaden tampones de lavado que eliminan impurezas sin liberar el cfDNA de las partículas.', terminosLinked: [], colorAcento: '#ffb300' },
      { numero: 4, titulo: 'Elución', descripcion: 'Se retira el imán, se añade tampón de baja salinidad y el cfDNA se separa de las partículas quedando disuelto en la solución.', terminosLinked: [], colorAcento: '#b388ff' }
    ],
    ventajaClave: 'Automatizable en plataformas KingFisher. Mínima variabilidad entre operadores.',
    limitacionClave: 'Requiere equipamiento de extracción magnética.',
    terminoGlosario: 'particulas-magneticas'
  },
  {
    id: 'kit-maxwell',
    nombre: 'Maxwell RSC ccfDNA Plasma',
    fabricante: 'Promega',
    principio: 'cartucho-cerrado',
    pasos: [
      { numero: 1, titulo: 'Carga del cartucho', descripcion: 'El plasma se carga en el pocillo de entrada del cartucho desechable cerrado. Todos los reactivos ya están preformateados dentro.', terminosLinked: [], colorAcento: '#00e5ff' },
      { numero: 2, titulo: 'Lisis + captura automatizada', descripcion: 'El instrumento Maxwell RSC mueve un pistón magnético que desplaza los reactivos de compartimento en compartimento. La lisis caotrópica y la captura del cfDNA en resina de sílice ocurren sin intervención manual.', terminosLinked: ['tampones-lisis-caotropica', 'cfDNA', 'particulas-magneticas'], colorAcento: '#39ff14' },
      { numero: 3, titulo: 'Lavados automatizados', descripcion: 'El pistón magnético ejecuta los lavados dentro del cartucho sellado, eliminando contaminantes sin riesgo de contaminación cruzada entre muestras.', terminosLinked: [], colorAcento: '#ffb300' },
      { numero: 4, titulo: 'Elución automatizada', descripcion: 'El instrumento realiza la elución en el compartimento final del cartucho. El cfDNA purificado queda recogido sin que el operador abra nada.', terminosLinked: [], colorAcento: '#b388ff' }
    ],
    ventajaClave: 'Máxima automatización. Cartucho cerrado elimina contaminación. Protocolo <1 h.',
    limitacionClave: 'Plataforma cerrada y propietaria. Menor rendimiento en cfDNA muy fragmentado.',
    terminoGlosario: 'columna-membrana-silice'
  },
  {
    id: 'kit-epiquik',
    nombre: 'EpiQuik Circulating Cell-Free DNA Isolation',
    fabricante: 'Epigentek',
    principio: 'columna-silice-optimizada',
    pasos: [
      { numero: 1, titulo: 'Lisis optimizada para fragmentos cortos', descripcion: 'Tampón de lisis con formulación específica para maximizar la recuperación de fragmentos menores de 150 pb, especialmente relevante en cfDNA parasitario muy degradado.', terminosLinked: ['tampones-lisis-caotropica', 'cfDNA', 'fragmento-nucleosomal'], colorAcento: '#00e5ff' },
      { numero: 2, titulo: 'Unión a membrana optimizada', descripcion: 'La columna de membrana de sílice usa tampones de unión reformulados que retienen fragmentos ultracortos que los kits convencionales perderían.', terminosLinked: ['columna-membrana-silice'], colorAcento: '#39ff14' },
      { numero: 3, titulo: 'Lavados suaves', descripcion: 'Tampones de lavado formulados para no despegar los fragmentos cortos ya unidos, que son más sensibles a las condiciones de lavado que el ADN de alto peso molecular.', terminosLinked: [], colorAcento: '#ffb300' },
      { numero: 4, titulo: 'Elución en volumen reducido', descripcion: 'Elución optimizada para maximizar la concentración del cfDNA recuperado, especialmente útil cuando la muestra de partida tiene muy baja concentración de ADN parasitario.', terminosLinked: [], colorAcento: '#b388ff' }
    ],
    ventajaClave: 'Especialmente eficaz para fragmentos menores de 150 pb. Bajo coste relativo.',
    limitacionClave: 'Menor validación en muestras parasitológicas. Rendimiento variable entre lotes.',
    terminoGlosario: 'columna-membrana-silice'
  }
]

export const tecnicasMoleculares: Tecnica[] = [
  { id: 'qPCR',   nombre: 'qPCR',           nivel: 'regional',   animacion: 'AnimQPCR',   lod: '1-5 parásitos/µL',             tiempo: '4 h',       coste: 'Medio',    escenario: 'Diagnóstico inicial en laboratorio equipado',   terminoGlosario: 'NGS' },
  { id: 'ddPCR',  nombre: 'ddPCR',           nivel: 'regional',   animacion: 'AnimDdPCR',  lod: '<1 parásito/µL',               tiempo: '4-6 h',     coste: 'Alto',     escenario: 'Monitorización postratamiento y EMR',           terminoGlosario: 'NGS' },
  { id: 'LAMP',   nombre: 'LAMP',            nivel: 'campo',      animacion: 'AnimLAMP',   lod: '10 fg de ADN',                 tiempo: '30-60 min', coste: 'Bajo',     escenario: 'Diagnóstico de campo sin termociclador',       terminoGlosario: 'LAMP' },
  { id: 'RPA',    nombre: 'RPA',             nivel: 'campo',      animacion: 'AnimRPA',    lod: '10 fg de ADN',                 tiempo: '20 min',    coste: 'Bajo',     escenario: 'Diagnóstico POC a temperatura corporal',       terminoGlosario: 'RPA' },
  { id: 'CRISPR', nombre: 'CRISPR-Cas',      nivel: 'campo',      animacion: 'AnimCRISPR', lod: 'Attomolar',                    tiempo: '<2 h',      coste: '2-4 €',    escenario: 'Diagnóstico POC sin instrumentación',           terminoGlosario: 'sistema-crispr-cas' },
  { id: 'mNGS',   nombre: 'mNGS',            nivel: 'referencia', animacion: 'AnimNGS',    lod: 'Agnóstico (cualquier patógeno)',tiempo: '2 días',    coste: 'Muy alto', escenario: 'Etiología incierta / coinfección',              terminoGlosario: 'metagenómica-clínica-no-invasiva' },
  { id: 'ONT',    nombre: 'Oxford Nanopore', nivel: 'regional',   animacion: 'AnimNGS',    lod: 'Similar a NGS Illumina',       tiempo: 'Tiempo real', coste: 'Medio',  escenario: 'Vigilancia genómica de resistencias en campo',  terminoGlosario: 'NGS' }
]
