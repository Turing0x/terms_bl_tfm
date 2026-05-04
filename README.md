# 🧬 BioGlosario — Glosario Interactivo de Biopsia Líquida y Parasitología

> SPA educativa para el estudio del TFM *"Biopsia líquida y su potencial diagnóstico. Uso en enfermedades parasitarias"*  
> Stack: **Astro + Tailwind CSS + TypeScript**

---

## 🎯 Objetivo del proyecto

Construir una Single Page Application visualmente dinámica e interactiva que sirva como herramienta de estudio personal para comprender los 68 conceptos del glosario del TFM. La app tiene cinco vistas con entidad propia: el mapa de relaciones, los grupos temáticos, el laboratorio interactivo de kits de extracción, el ecosistema de técnicas moleculares y las fichas individuales de cada término. Todo está conectado: las visualizaciones interactivas de las vistas Laboratorio y Técnicas son el puente entre entender visualmente y entender en profundidad, y cada elemento clickeable lleva a la ficha del término correspondiente en el glosario.

---

## 🎨 Dirección estética

**Concepto visual:** *Laboratorio bioluminiscente* — oscuro, científico, con acentos de color neón que evocan fluorescencia (como los fluoróforos usados en PCR). Tipografía técnica pero legible. Sensación de estar mirando dentro de un microscopio o un visor de secuenciación.

**Paleta de colores:**
```
--bg-primary:     #0a0e1a   /* Fondo principal — azul noche profundo */
--bg-secondary:   #111827   /* Fondo de tarjetas */
--bg-card:        #1a2235   /* Fondo de fichas */
--accent-cyan:    #00e5ff   /* Acento principal — cian bioluminiscente */
--accent-green:   #39ff14   /* Acento secundario — verde neón */
--accent-amber:   #ffb300   /* Términos secundarios */
--accent-purple:  #b388ff   /* Relaciones entre conceptos */
--text-primary:   #e2e8f0   /* Texto principal */
--text-muted:     #64748b   /* Texto secundario */
--border:         #1e3a5f   /* Bordes suaves */
```

**Tipografía:**
- Display / Títulos: `Space Mono` — monoespaciada, técnica, evoca terminal científico
- Body: `DM Sans` — moderna, limpia, cómoda para leer bloques de texto

**Efectos visuales:**
- Fondo con patrón sutil de puntos (dot grid) tipo papel de laboratorio
- Cards con borde luminoso suave (box-shadow con color de acento)
- Hover states con transición de color y ligero scale
- Tags de términos con pill colorido según tipo (principal / secundario / relación)
- Animación de entrada staggered al cargar cada grupo

---

## 🗂️ Arquitectura de la aplicación

```
bioglosario/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro              # Logo + navegación de las 5 vistas principales
│   │   │   └── Sidebar.astro             # Panel lateral con lista de grupos
│   │   ├── views/
│   │   │   ├── MapaView.astro            # Vista 1 — Grafo D3 de relaciones entre términos
│   │   │   ├── GruposView.astro          # Vista 2 — Grid de los 9 grupos temáticos
│   │   │   ├── LaboratorioView.astro     # Vista 3 — Comparador interactivo de kits de extracción
│   │   │   ├── TecnicasView.astro        # Vista 4 — Ecosistema de técnicas moleculares por niveles
│   │   │   └── FichaView.astro           # Vista 5 — Ficha individual de término
│   │   ├── laboratorio/
│   │   │   ├── KitStepper.astro          # Stepper animado de pasos de extracción por kit
│   │   │   ├── KitComparador.astro       # Vista paralela de los 4 kits paso a paso
│   │   │   └── PasoExtraccion.astro      # Componente de un paso individual con términos clickeables
│   │   ├── tecnicas/
│   │   │   ├── EcosistemaTecnicas.astro  # Grid de técnicas organizadas por nivel
│   │   │   ├── NivelCard.astro           # Card de nivel (campo / regional / referencia)
│   │   │   ├── TecnicaPanel.astro        # Panel con animación + descripción de la técnica
│   │   │   └── animaciones/
│   │   │       ├── AnimQPCR.astro        # Animación curva de amplificación qPCR
│   │   │       ├── AnimDdPCR.astro       # Animación particionamiento en gotitas ddPCR
│   │   │       ├── AnimLAMP.astro        # Animación bucle isotérmico LAMP
│   │   │       ├── AnimRPA.astro         # Animación recombinasa + polimerasa RPA
│   │   │       ├── AnimCRISPR.astro      # Animación activación nucleasa Cas + trans-cleavage
│   │   │       └── AnimNGS.astro         # Animación flujo de lecturas y clasificación taxonómica
│   │   ├── ui/
│   │   │   ├── TermTag.astro             # Pill clickeable de término (abre FichaView)
│   │   │   ├── ConceptCard.astro         # Tarjeta de concepto en grupos
│   │   │   ├── RelationBadge.astro       # Badge de tipo de relación en el grafo
│   │   │   ├── SearchBar.astro           # Búsqueda global con Cmd+K
│   │   │   ├── BreadCrumb.astro          # Navegación contextual
│   │   │   └── NavTab.astro              # Tab de navegación entre las 5 vistas
│   │   └── graph/
│   │       └── ConceptGraph.astro        # Grafo D3 force-directed con filtro por grupo
│   ├── mock/
│   │   └── glosario_biopsialiquida.json  # Fuente de datos única — NO importar directamente
│   ├── lib/
│   │   ├── glosario.ts                   # Acceso tipado al JSON — único punto de entrada a datos
│   │   ├── parseLinks.ts                 # Parser [[id]] → TermTag clickeable
│   │   └── tecnicas.ts                   # Datos estáticos de animaciones y pasos por técnica/kit
│   ├── layouts/
│   │   └── BaseLayout.astro              # Layout raíz con fuentes, meta y variables CSS
│   ├── pages/
│   │   └── index.astro                   # Página principal (todas las vistas se montan aquí)
│   ├── styles/
│   │   └── global.css                    # Variables CSS + utilidades globales
│   └── types/
│       └── index.ts                      # Tipos: Termino, Grupo, Relacion, Glosario, Tecnica, PasoKit
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## 📦 Estructura de datos

### Fuente única de verdad

Todos los datos del glosario viven en un único archivo:

```
src/mock/glosario_biopsialiquida.json
```

Este archivo **no se genera en tiempo de ejecución** ni se consume directamente desde los componentes. En su lugar, existe una capa de acceso en `src/lib/glosario.ts` que lo importa, lo tipifica y expone funciones de consulta que el resto de la app usa.

Los datos de las animaciones de técnicas y los pasos de los kits de extracción viven en `src/lib/tecnicas.ts`, separados del JSON porque son datos de presentación (textos de pasos, SVG paths, timings de animación) no de contenido de glosario.

> ⚠️ **Regla de oro:** ningún componente `.astro` ni ningún archivo `.ts` debe hacer `import` directo del JSON. Todo acceso a datos de glosario pasa por `src/lib/glosario.ts`.

---

### Estructura del JSON

El archivo tiene cuatro secciones de primer nivel:

```json
{
  "meta":       { ... },   // Metadatos del proyecto (v1.3)
  "grupos":     [ ... ],   // 9 grupos temáticos
  "relaciones": [ ... ],   // 65 relaciones tipadas entre términos
  "terminos":   [ ... ]    // 68 términos con explicaciones completas
}
```

#### `meta`
Información del proyecto: título, versión, autora, tutora, universidad y totales.

#### `grupos` — Array de 9 objetos
```json
{
  "id": "grupo-1",
  "nombre": "El origen del material circulante",
  "subtitulo": "¿De dónde viene todo lo que detectamos en sangre?",
  "emoji": "🔬",
  "color": "#00e5ff",
  "terminosPrincipales": ["celula-tumoral-circulante", "apoptosis", ...],
  "terminosSecundarios": ["membrana-lipidica", "espacio-extracelular", ...]
}
```

#### `relaciones` — Array de 65 objetos
```json
{
  "desde": "cfDNA",
  "hasta": "apoptosis",
  "tipo": "originado-por",
  "descripcion": "La apoptosis libera fragmentos de ADN al plasma que se convierten en cfDNA"
}
```

Tipos de relación disponibles: `originado-por`, `vive-en`, `degradado-por`, `determina-tamano`, `protegido-por`, `es-subtipo-de`, `procede-de`, `compuesta-de`, `contiene`, `estudiada-por`, `estudiado-por`, `objeto-de-estudio-de`, `engloba`, `requiere`, `analiza`, `habilita`, `utiliza`, `usa`, `combinable-con`, `trabaja-con`, `realizada-por`, `origina`, `contamina`, `altera`, `libera-contenido-a`, `detectada-en`, `inactiva`, `permite-union-a`, `optimizado-para`, `recubiertas-de`, `libera`, `reduce-riesgo-de`, `se-basa-en`, `comparada-con`, `condiciona`, `determina`, `limita`, `referencia`, `puede-causar`, `requiere-bajo`, `invisible-para`, `tiene-baja`, `supera-a`, `no-detecta`, `sostiene`, `es-un`.

#### `terminos` — Array de 68 objetos
```json
{
  "id": "cfDNA",
  "nombre": "ADN libre circulante (cfDNA)",
  "tipo": "principal",
  "grupo": "grupo-2",
  "definicionCorta": "Fragmentos de ADN que flotan libres en el plasma...",
  "explicacion": "El cfDNA... [[apoptosis]] o por [[lisis-celular]]...",
  "relacionados": ["ctDNA", "apoptosis", "lisis-celular", ...],
  "apareceComo": []
}
```

- `tipo`: `"principal"` (54 términos) o `"secundario"` (14 términos)
- `explicacion`: texto completo con `[[id-termino]]` para links internos
- `relacionados`: IDs de términos para el grafo D3
- `apareceComo`: IDs de términos en cuyas explicaciones aparece este término

---

### Capa de acceso — `src/lib/glosario.ts`

```typescript
import data from '../mock/glosario_biopsialiquida.json'
import type { Glosario, Termino, Grupo, Relacion } from '../types'

const glosario = data as Glosario

export const getTerminos   = (): Termino[]  => glosario.terminos
export const getGrupos     = (): Grupo[]    => glosario.grupos
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
```

---

### Capa de datos de presentación — `src/lib/tecnicas.ts`

Este módulo contiene los datos que alimentan las vistas **Laboratorio** y **Técnicas**: pasos de extracción por kit y metadatos de las animaciones. No viene del JSON porque son datos de presentación, no de contenido de glosario.

```typescript
export interface PasoKit {
  numero: number
  titulo: string          // ej: "Lisis caotrópica"
  descripcion: string     // explicación del paso
  terminosLinked: string[] // IDs de términos del glosario mencionados en este paso
  colorAcento: string     // color visual del paso
}

export interface KitExtraccion {
  id: string              // ej: "kit-qiAamp"
  nombre: string
  fabricante: string
  principio: string       // "columna-silice" | "particulas-magneticas" | "cartucho-cerrado"
  pasos: PasoKit[]
  ventajaClave: string
  limitacionClave: string
  terminoGlosario: string // ID del término en el JSON para linkear la ficha
}

export interface Tecnica {
  id: string              // ej: "qPCR"
  nombre: string
  nivel: 'campo' | 'regional' | 'referencia'
  animacion: string       // nombre del componente de animación a montar
  lod: string            // límite de detección (texto descriptivo)
  tiempo: string         // tiempo de respuesta
  coste: string          // coste relativo
  escenario: string      // escenario clínico óptimo
  terminoGlosario: string // ID del término en el JSON
}

// Kits definidos con sus pasos completos
export const kitsExtraccion: KitExtraccion[] = [
  {
    id: 'kit-qiAamp',
    nombre: 'QIAamp Circulating Nucleic Acid',
    fabricante: 'Qiagen',
    principio: 'columna-silice',
    pasos: [
      { numero: 1, titulo: 'Lisis caotrópica', descripcion: 'Se añade tampón con cloruro de guanidinio al plasma. El agente caotrópico desnaturaliza proteínas y DNAsas, liberando el cfDNA.', terminosLinked: ['agente-caotropico', 'dnasas-plasmaticas', 'cfDNA'], colorAcento: '#00e5ff' },
      { numero: 2, titulo: 'Unión a la membrana', descripcion: 'La mezcla pasa por la columna de membrana de sílice. En presencia de alta salinidad, el cfDNA se une a la membrana. Los contaminantes fluyen a través.', terminosLinked: ['columna-membrana-silice', 'resina-silice'], colorAcento: '#39ff14' },
      { numero: 3, titulo: 'Lavados', descripcion: 'Dos lavados sucesivos eliminan sales residuales, lípidos y proteínas sin despegar el cfDNA de la membrana.', terminosLinked: [], colorAcento: '#ffb300' },
      { numero: 4, titulo: 'Elución', descripcion: 'Se añade tampón de baja salinidad o agua. La afinidad del cfDNA por la sílice se revierte y el ADN se libera purificado en un volumen de 20-100 µL.', terminosLinked: ['elusion', 'fragmento-nucleosomal'], colorAcento: '#b388ff' }
    ],
    ventajaClave: 'Estándar de referencia más validado. Alta reproducibilidad.',
    limitacionClave: 'Requiere 1-4 mL de plasma. Protocolo de ~3 h. Coste elevado.',
    terminoGlosario: 'kit-qiAamp'
  },
  {
    id: 'kit-magmax',
    nombre: 'MagMAX Cell-Free DNA',
    fabricante: 'Thermo Fisher',
    principio: 'particulas-magneticas',
    pasos: [
      { numero: 1, titulo: 'Lisis caotrópica', descripcion: 'El plasma se mezcla con tampón caotrópico que desnaturaliza proteínas y detiene la actividad de las DNAsas.', terminosLinked: ['agente-caotropico', 'dnasas-plasmaticas'], colorAcento: '#00e5ff' },
      { numero: 2, titulo: 'Captura magnética', descripcion: 'Se añaden partículas magnéticas recubiertas de sílice. El cfDNA se une a su superficie. Se aplica un imán externo que retiene las partículas; el sobrenadante con contaminantes se aspira.', terminosLinked: ['particulas-magneticas', 'resina-silice', 'cfDNA'], colorAcento: '#39ff14' },
      { numero: 3, titulo: 'Lavados con imán', descripcion: 'Con el imán activo, se añaden tampones de lavado que eliminan impurezas sin liberar el cfDNA de las partículas.', terminosLinked: [], colorAcento: '#ffb300' },
      { numero: 4, titulo: 'Elución', descripcion: 'Se retira el imán, se añade tampón de baja salinidad y el cfDNA se separa de las partículas quedando disuelto en la solución.', terminosLinked: ['elusion'], colorAcento: '#b388ff' }
    ],
    ventajaClave: 'Automatizable en plataformas KingFisher. Mínima variabilidad entre operadores.',
    limitacionClave: 'Requiere equipamiento de extracción magnética.',
    terminoGlosario: 'kit-magmax'
  },
  {
    id: 'kit-maxwell',
    nombre: 'Maxwell RSC ccfDNA Plasma',
    fabricante: 'Promega',
    principio: 'cartucho-cerrado',
    pasos: [
      { numero: 1, titulo: 'Carga del cartucho', descripcion: 'El plasma se carga en el pocillo de entrada del cartucho desechable cerrado. Todos los reactivos ya están preformateados dentro.', terminosLinked: ['automatizacion-extraccion'], colorAcento: '#00e5ff' },
      { numero: 2, titulo: 'Lisis + captura automatizada', descripcion: 'El instrumento Maxwell RSC mueve un pistón magnético que desplaza los reactivos de compartimento en compartimento. La lisis caotrópica y la captura del cfDNA en resina de sílice ocurren sin intervención manual.', terminosLinked: ['agente-caotropico', 'resina-silice', 'cfDNA', 'particulas-magneticas'], colorAcento: '#39ff14' },
      { numero: 3, titulo: 'Lavados automatizados', descripcion: 'El pistón magnético ejecuta los lavados dentro del cartucho sellado, eliminando contaminantes sin riesgo de contaminación cruzada entre muestras.', terminosLinked: [], colorAcento: '#ffb300' },
      { numero: 4, titulo: 'Elución automatizada', descripcion: 'El instrumento realiza la elución en el compartimento final del cartucho. El cfDNA purificado queda recogido sin que el operador abra nada.', terminosLinked: ['elusion'], colorAcento: '#b388ff' }
    ],
    ventajaClave: 'Máxima automatización. Cartucho cerrado elimina contaminación. Protocolo <1 h.',
    limitacionClave: 'Plataforma cerrada y propietaria. Menor rendimiento en cfDNA muy fragmentado.',
    terminoGlosario: 'kit-maxwell'
  },
  {
    id: 'kit-epiquik',
    nombre: 'EpiQuik Circulating Cell-Free DNA Isolation',
    fabricante: 'Epigentek',
    principio: 'columna-silice-optimizada',
    pasos: [
      { numero: 1, titulo: 'Lisis optimizada para fragmentos cortos', descripcion: 'Tampón de lisis con formulación específica para maximizar la recuperación de fragmentos menores de 150 pb, especialmente relevante en cfDNA parasitario muy degradado.', terminosLinked: ['agente-caotropico', 'cfDNA', 'fragmento-nucleosomal'], colorAcento: '#00e5ff' },
      { numero: 2, titulo: 'Unión a membrana optimizada', descripcion: 'La columna de membrana de sílice usa tampones de unión reformulados que retienen fragmentos ultracortos que los kits convencionales perderían.', terminosLinked: ['columna-membrana-silice'], colorAcento: '#39ff14' },
      { numero: 3, titulo: 'Lavados suaves', descripcion: 'Tampones de lavado formulados para no despegar los fragmentos cortos ya unidos, que son más sensibles a las condiciones de lavado que el ADN de alto peso molecular.', terminosLinked: [], colorAcento: '#ffb300' },
      { numero: 4, titulo: 'Elución en volumen reducido', descripcion: 'Elución optimizada para maximizar la concentración del cfDNA recuperado, especialmente útil cuando la muestra de partida tiene muy baja concentración de ADN parasitario.', terminosLinked: ['elusion'], colorAcento: '#b388ff' }
    ],
    ventajaClave: 'Especialmente eficaz para fragmentos menores de 150 pb. Bajo coste relativo.',
    limitacionClave: 'Menor validación en muestras parasitológicas. Rendimiento variable entre lotes.',
    terminoGlosario: 'kit-epiquik'
  }
]

// Técnicas moleculares con sus metadatos para la vista Técnicas
export const tecnicasMoleculares: Tecnica[] = [
  { id: 'qPCR',    nombre: 'qPCR',    nivel: 'regional',   animacion: 'AnimQPCR',   lod: '1-5 parásitos/µL',      tiempo: '4 h',    coste: 'Medio',   escenario: 'Diagnóstico inicial en laboratorio equipado', terminoGlosario: 'NGS' },
  { id: 'ddPCR',   nombre: 'ddPCR',   nivel: 'regional',   animacion: 'AnimDdPCR',  lod: '<1 parásito/µL',        tiempo: '4-6 h',  coste: 'Alto',    escenario: 'Monitorización postratamiento y EMR', terminoGlosario: 'NGS' },
  { id: 'LAMP',    nombre: 'LAMP',    nivel: 'campo',      animacion: 'AnimLAMP',   lod: '10 fg de ADN',          tiempo: '30-60 min', coste: 'Bajo', escenario: 'Diagnóstico de campo sin termociclador', terminoGlosario: 'LAMP' },
  { id: 'RPA',     nombre: 'RPA',     nivel: 'campo',      animacion: 'AnimRPA',    lod: '10 fg de ADN',          tiempo: '20 min', coste: 'Bajo',    escenario: 'Diagnóstico POC a temperatura corporal', terminoGlosario: 'RPA' },
  { id: 'CRISPR',  nombre: 'CRISPR-Cas', nivel: 'campo',  animacion: 'AnimCRISPR', lod: 'Attomolar',             tiempo: '<2 h',   coste: '2-4 €',   escenario: 'Diagnóstico POC sin instrumentación', terminoGlosario: 'sistema-crispr-cas' },
  { id: 'mNGS',    nombre: 'mNGS',    nivel: 'referencia', animacion: 'AnimNGS',    lod: 'Agnóstico (cualquier patógeno)', tiempo: '2 días', coste: 'Muy alto', escenario: 'Etiología incierta / coinfección', terminoGlosario: 'metagenómica-clinica' },
  { id: 'ONT',     nombre: 'Oxford Nanopore', nivel: 'regional', animacion: 'AnimNGS', lod: 'Similar a NGS Illumina', tiempo: 'Tiempo real', coste: 'Medio', escenario: 'Vigilancia genómica de resistencias en campo', terminoGlosario: 'NGS' }
]
```

---

### Parser de links internos — `src/lib/parseLinks.ts`

```typescript
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
```

---

### Tipos TypeScript — `src/types/index.ts`

```typescript
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

// Tipos para vistas Laboratorio y Técnicas (vienen de tecnicas.ts, no del JSON)
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
```

---

## 🖥️ Vistas de la aplicación

La navegación principal tiene **cinco tabs** siempre visibles en el Header. La SPA monta y desmonta vistas sin recarga de página usando la History API.

```
[ 🗺️ Mapa ]  [ 🗂️ Grupos ]  [ ⚗️ Laboratorio ]  [ 🛠️ Técnicas ]  [ 🔍 Buscar ]
```

---

### Vista 1 — Mapa de Relaciones
**Ruta:** `/` (vista por defecto)

Grafo interactivo construido con D3.js (force-directed graph) que muestra los 68 términos como nodos y las 65 relaciones como aristas.

- Nodos coloreados por grupo temático (color del grupo en el JSON)
- Nodos con tamaño proporcional al número de relaciones
- Aristas con estilo según tipo de relación (grosor y opacidad variable)
- **Hover** sobre nodo: resalta el nodo y sus conexiones directas, opaca el resto
- **Click** sobre nodo: abre FichaView del término
- Controles: zoom con rueda, pan con drag, filtro por grupo con pills
- Leyenda de colores y tipos de relación en esquina inferior

---

### Vista 2 — Grupos Temáticos
**Ruta:** `/grupos`

Grid de 9 cards, una por grupo temático.

- Cada card: emoji, nombre, subtítulo, número de términos, lista de pills de términos principales
- **Click en card**: expande el grupo mostrando sus ConceptCards ordenadas (principales primero, luego secundarios)
- Dentro de cada ConceptCard: nombre, definición corta, tags de relacionados clickeables
- **Click en cualquier término**: abre FichaView
- Navegación entre grupos expandidos con flechas laterales

---

### Vista 3 — Laboratorio de Extracción
**Ruta:** `/laboratorio`

Visualización interactiva de los cuatro kits de extracción de cfDNA.

**Modo individual (por defecto):**
- Selector de kit en la parte superior (4 tabs: QIAamp / MagMAX / Maxwell / EpiQuik)
- Stepper vertical de 4 pasos con animación al avanzar
- Cada paso muestra: número, título, descripción, diagrama SVG del paso, y tags clickeables de los términos del glosario mencionados
- Indicador visual del principio del kit (columna de sílice / partículas magnéticas / cartucho cerrado)

**Modo comparación:**
- Toggle "Comparar los 4 kits" activa una tabla de 4 columnas paralelas
- Cada columna muestra los 4 pasos del kit con el color de acento del paso correspondiente
- Los pasos equivalentes quedan alineados horizontalmente para comparar diferencias
- Fila inferior: ventaja clave y limitación clave de cada kit resaltadas
- Cada nombre de kit es clickeable y abre su FichaView en el glosario

**Integración con glosario:**
- Todos los términos técnicos mencionados en los pasos (agente caotrópico, DNAsas plasmáticas, partículas magnéticas, elución...) aparecen como TermTags clickeables
- Click en TermTag → abre FichaView del término sin perder el contexto del Laboratorio (panel lateral o modal)

---

### Vista 4 — Ecosistema de Técnicas Moleculares
**Ruta:** `/tecnicas`

Visualización del ecosistema de técnicas moleculares organizada por los **tres niveles de implementación** del TFM.

**Estructura de tres niveles (columnas o zonas visuales):**

```
┌─────────────────┬──────────────────────┬──────────────────────────┐
│  NIVEL CAMPO    │  NIVEL REGIONAL      │  NIVEL REFERENCIA        │
│  Sin laboratorio│  Laboratorio básico  │  Lab. nacional / I+D     │
├─────────────────┼──────────────────────┼──────────────────────────┤
│  LAMP           │  qPCR                │  mNGS (Illumina)         │
│  RPA            │  ddPCR               │  Proteómica / Metabolómica│
│  CRISPR-Cas     │  Oxford Nanopore     │  small RNA-seq           │
└─────────────────┴──────────────────────┴──────────────────────────┘
```

- Cada técnica es una card con: nombre, nivel (badge), LOD, tiempo de respuesta, coste relativo y escenario clínico óptimo
- **Click en card**: abre el TecnicaPanel lateral con la animación SVG del principio de funcionamiento y descripción detallada
- En el TecnicaPanel: botón "Ver ficha completa" que abre FichaView del término

**Animaciones SVG por técnica:**

| Técnica | Animación |
|---|---|
| qPCR | Curva sigmoidea de amplificación que crece ciclo a ciclo con marcador de Ct |
| ddPCR | Muestra dividiéndose en ~20.000 gotitas; gotitas positivas iluminándose en verde |
| LAMP | ADN abriéndose isotérmicamente y generando bucles que se replican en cascada |
| RPA | Recombinasa abriendo la doble cadena; polimerasa copiando a temperatura baja |
| CRISPR-Cas | ARN guía buscando su diana; Cas activándose y cortando moléculas reporteras lateralmente |
| mNGS | Río de lecturas cortas; filtrado bioinformático; lecturas parasitarias emergiendo del ruido humano |
| Oxford Nanopore | Molécula de ADN individual pasando por el nanoporo; corriente eléctrica leyendo cada base |

**Tabla comparativa integrada:**
- Debajo de los tres niveles, una tabla resumen comparativa de todas las técnicas con las métricas clave (LOD, tiempo, coste, escenario) para repaso rápido

---

### Vista 5 — Ficha Individual
**Ruta:** `/termino/:id`

Panel principal de cualquier término del glosario. Se abre desde cualquier otra vista.

- Nombre grande + badge de tipo (principal / secundario) + badge de grupo con su color
- Definición corta en caja destacada con borde de acento
- Explicación completa con todos los `[[links]]` renderizados como TermTags clickeables
- Sección **"Aparece en"**: lista de fichas donde este término es mencionado como secundario
- Sección **"Términos relacionados"**: grid de pills con los términos relacionados del grafo
- Sección **"Relaciones"**: lista de las relaciones tipadas entrantes y salientes del término
- Breadcrumb de navegación con retorno a la vista anterior
- Para kits y técnicas: botón "Ver en Laboratorio" o "Ver en Técnicas" que lleva a la vista correspondiente con ese elemento seleccionado

---

### Vista transversal — Búsqueda Global
**Acceso:** `Cmd+K` desde cualquier vista, o barra superior en Header

- Búsqueda en tiempo real sobre `nombre` y `definicionCorta` de todos los términos
- Resultados agrupados: Principales / Secundarios / Kits / Técnicas
- Navegación con teclado (↑↓ para moverse, Enter para abrir ficha)
- Muestra el grupo de pertenencia de cada resultado como badge de color

---

## 📚 Contenido — Grupos y términos (v1.3)

### Grupo 1 — El origen del material circulante 🔬
- **Principales:** Célula tumoral circulante, Célula neoplásica, Apoptosis, Lisis celular
- **Secundarios:** Membrana lipídica, Espacio extracelular, Núcleo celular

### Grupo 2 — El ADN que viaja en sangre 🧬
- **Principales:** cfDNA, ctDNA, Fragmento nucleosómico, DNAsas plasmáticas
- **Secundarios:** Plasma/suero, Nucleosoma, Sangre periférica, Lisis leucocitaria

### Grupo 3 — Otros mensajeros circulantes 📡
- **Principales:** Vesícula extracelular, Exovesículas séricas, microARN, Metabolito, Analito
- **Secundarios:** Membrana lipídica, Espacio extracelular

### Grupo 4 — Las ómicas 🔭
- **Principales:** Ómica, Proteómica, Metabolómica, Vesiculómica, miARNómica, Metaboloma
- **Secundarios:** Analito, Plasma/suero, Degradación enzimática plasmática

### Grupo 5 — Extracción y preparación de muestra ⚗️
- **Principales:** Sangre periférica, Plasma/suero, Lisis leucocitaria, Columna de membrana de sílice, Tampones de lisis caotrópica, Agente caotrópico, QIAamp (Qiagen), MagMAX (Thermo Fisher), Maxwell RSC (Promega), EpiQuik (Epigentek)
- **Secundarios:** Fragmento nucleosómico, cfDNA, DNAsas plasmáticas, Partículas magnéticas, Resina de sílice, Automatización de extracción, Elución

### Grupo 6 — Técnicas de detección y amplificación 🛠️
- **Principales:** NGS, Metagenómica clínica no invasiva, Depleción del genoma, Sistema CRISPR-Cas, Nucleasas Cas, LAMP, RPA, RPA con flujo lateral, ADN polimerasa, Electroforesis, Fluorómetros
- **Secundarios:** cfDNA, Fragmento nucleosómico, Analito, NHGRI, Repositorios institucionales

### Grupo 7 — Biología parasitaria circulante 🦠
- **Principales:** Diversidad taxonómica, Protozoo hemático, Ciclo intraeritrocitario, Nematodo intestinal, Helminto tisular, Parasitemia periférica, ADN del kinetoplasto
- **Secundarios:** Lisis celular, cfDNA, Vesícula extracelular, Espacio extracelular

### Grupo 8 — Contexto clínico 🏥
- **Principales:** Recidiva, Iatrogenia, Sangre periférica
- **Secundarios:** Parasitemia periférica, Apoptosis, Lisis celular

### Grupo 9 — Los conceptos que articulan todo 🧩
- **Principales:** Biopsia líquida, Principio de inferencia indirecta, Ratio señal/ruido parasitario, Brecha metodológica transversal, Enfermedad mínima residual, Parasitosis submicroscópica, Umbral de detección LOD, Gold standard diagnóstico

---

## 🚀 Plan de implementación — Fases

### Fase 1 — Setup del proyecto
```bash
npm create astro@latest bioglosario -- --template minimal
cd bioglosario
npx astro add tailwind
npm install d3
npm install @fontsource/space-mono @fontsource/dm-sans
```
- Configurar `tailwind.config.mjs` con la paleta personalizada
- Configurar fuentes en `BaseLayout.astro`
- Definir variables CSS en `global.css`
- Crear tipos TypeScript en `src/types/index.ts`

### Fase 2 — Capa de datos
- El JSON ya existe en `src/mock/glosario_biopsialiquida.json` — **no regenerar**
- Crear `src/lib/glosario.ts` con todas las funciones de acceso tipadas
- Crear `src/lib/parseLinks.ts` con el parser de `[[links]]` internos
- Crear `src/lib/tecnicas.ts` con los datos de kits y técnicas para las vistas interactivas
- Verificar que `tsconfig.json` tiene `"resolveJsonModule": true`

### Fase 3 — Componentes base
- `NavTab.astro` — tab de navegación entre las 5 vistas
- `TermTag.astro` — pill clickeable con color según tipo
- `ConceptCard.astro` — tarjeta de concepto en grupos
- `SearchBar.astro` — búsqueda global con `Cmd+K`
- `BreadCrumb.astro` — navegación contextual
- `RelationBadge.astro` — badge de tipo de relación

### Fase 4 — Vista Mapa
- `ConceptGraph.astro` — grafo D3 force-directed completo
- Filtro por grupo, hover, click, zoom y pan

### Fase 5 — Vista Grupos y Ficha
- `GruposView.astro` — grid de 9 grupos con expansión
- `FichaView.astro` — ficha individual con links internos resueltos

### Fase 6 — Vista Laboratorio
- `KitStepper.astro` — stepper de 4 pasos con animación SVG por paso
- `KitComparador.astro` — vista paralela de los 4 kits
- `PasoExtraccion.astro` — paso individual con TermTags
- Toggle entre modo individual y modo comparación

### Fase 7 — Vista Técnicas
- `EcosistemaTecnicas.astro` — grid de tres niveles
- `NivelCard.astro` — card de nivel con técnicas
- `TecnicaPanel.astro` — panel lateral con animación
- Animaciones SVG: `AnimQPCR`, `AnimDdPCR`, `AnimLAMP`, `AnimRPA`, `AnimCRISPR`, `AnimNGS`

### Fase 8 — Layout, navegación y pulido
- `Header.astro` con los 5 NavTabs y búsqueda global
- Routing SPA con History API
- Animaciones de entrada (stagger)
- Responsive para móvil
- Accesibilidad básica (ARIA labels, navegación por teclado)

---

## ⚙️ Dependencias

```json
{
  "dependencies": {
    "astro": "^4.x",
    "d3": "^7.x",
    "@astrojs/tailwind": "^5.x",
    "@fontsource/space-mono": "^5.x",
    "@fontsource/dm-sans": "^5.x"
  },
  "devDependencies": {
    "tailwindcss": "^3.x",
    "typescript": "^5.x"
  }
}
```

---

## 📋 Decisiones técnicas

| Decisión | Elección | Razón |
|---|---|---|
| Framework | Astro | Ideal para contenido estático/semi-estático; sin overhead de JS innecesario |
| Estilos | Tailwind CSS | Velocidad de prototipado; fácil consistencia visual |
| Grafo | D3.js | Estándar para visualizaciones de datos; control total sobre el render |
| Animaciones | SVG animado inline | Sin dependencias externas; control total sobre timing y estética |
| Tipado | TypeScript | Seguridad en el modelo de datos del glosario |
| Estado/Routing | Vanilla JS + History API | Sin necesidad de React/Vue para esta escala |
| Fuentes | Fontsource (local) | Sin dependencia de red externa |
| Datos glosario | JSON estático en `src/mock/` | Fuente única de verdad; fácil de mantener y versionar |
| Datos presentación | `src/lib/tecnicas.ts` | Separados del glosario; datos de UI no de contenido |
| Import JSON | `resolveJsonModule: true` en tsconfig | Import del JSON como módulo tipado en TypeScript |

---

## 🔮 Posibles extensiones futuras

- **Modo quiz**: el sistema muestra la definición y hay que adivinar el término
- **Progreso de estudio**: marcar qué términos ya se dominan (localStorage)
- **Exportar ficha** individual como imagen para repasar offline
- **Modo presentación**: navegar fichas como slides para repasar antes de la defensa
- **Línea de tiempo**: visualizar la evolución histórica de los conceptos (cfDNA tumoral → cfDNA parasitario)

---

*Proyecto de estudio personal — TFM Ana María Cárdenas Sánchez, UGR 2025*