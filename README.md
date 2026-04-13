# 🧬 BioGlosario — Glosario Interactivo de Biopsia Líquida y Parasitología

> SPA educativa para el estudio del TFM *"Biopsia líquida y su potencial diagnóstico. Uso en enfermedades parasitarias"*  
> Stack: **Astro + Tailwind CSS + TypeScript**

---

## 🎯 Objetivo del proyecto

Construir una Single Page Application visualmente dinámica e interactiva que sirva como herramienta de estudio personal para comprender los ~58 conceptos del glosario del TFM. La app permite navegar por grupos temáticos, explorar relaciones entre conceptos y acceder a fichas individuales autocontenidas, donde cada término secundario que aparece en una explicación es clickeable y lleva a su propia ficha.

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
│   │   │   ├── Header.astro          # Logo + navegación principal
│   │   │   └── Sidebar.astro         # Panel lateral con lista de grupos
│   │   ├── views/
│   │   │   ├── MapaView.astro         # Vista de mapa/grafo de relaciones
│   │   │   ├── GrupoView.astro        # Vista de grupo temático
│   │   │   └── FichaView.astro        # Vista de ficha individual
│   │   ├── ui/
│   │   │   ├── TermTag.astro          # Pill clickeable de término
│   │   │   ├── ConceptCard.astro      # Tarjeta de concepto en grupo
│   │   │   ├── RelationBadge.astro    # Badge de relación entre conceptos
│   │   │   ├── SearchBar.astro        # Barra de búsqueda global
│   │   │   └── BreadCrumb.astro       # Navegación contextual
│   │   └── graph/
│   │       └── ConceptGraph.astro     # Componente de grafo interactivo (D3.js)
│   ├── mock/
│   │   └── glosario_biopsialiquida.json  # ✅ Fuente de datos única — NO editar directamente
│   ├── lib/
│   │   ├── glosario.ts               # Carga y expone el JSON como módulo tipado
│   │   └── parseLinks.ts             # Parser de [[links]] internos → TermTag
│   ├── layouts/
│   │   └── BaseLayout.astro           # Layout raíz con fuentes y meta
│   ├── pages/
│   │   └── index.astro                # Página principal (SPA)
│   ├── styles/
│   │   └── global.css                 # Variables CSS + utilidades globales
│   └── types/
│       └── index.ts                   # Tipos TypeScript del proyecto
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

> ⚠️ **Regla de oro:** ningún componente `.astro` ni ningún archivo `.ts` debe hacer `import` directo del JSON. Todo acceso a datos pasa por `src/lib/glosario.ts`.

---

### Estructura del JSON

El archivo tiene cuatro secciones de primer nivel:

```json
{
  "meta":      { ... },   // Metadatos del proyecto
  "grupos":    [ ... ],   // 8 grupos temáticos
  "relaciones":[ ... ],   // 34 relaciones tipadas entre términos
  "terminos":  [ ... ]    // 49 términos con explicaciones completas
}
```

#### `meta`
Información del proyecto: título, versión, autora, tutora, universidad y totales.

#### `grupos` — Array de 8 objetos
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

#### `relaciones` — Array de 34 objetos
```json
{
  "desde": "cfDNA",
  "hasta": "apoptosis",
  "tipo": "originado-por",
  "descripcion": "La apoptosis libera fragmentos de ADN al plasma que se convierten en cfDNA"
}
```
Tipos de relación disponibles: `originado-por`, `vive-en`, `degradado-por`, `determina-tamano`, `protegido-por`, `es-subtipo-de`, `procede-de`, `compuesta-de`, `contiene`, `estudiada-por`, `estudiado-por`, `objeto-de-estudio-de`, `engloba`, `requiere`, `analiza`, `habilita`, `utiliza`, `usa`, `combinable-con`, `trabaja-con`, `realizada-por`, `origina`, `contamina`, `altera`, `libera-contenido-a`, `detectada-en`.

#### `terminos` — Array de 49 objetos
```json
{
  "id": "cfDNA",
  "nombre": "ADN libre circulante (cfDNA)",
  "tipo": "principal",
  "grupo": "grupo-2",
  "definicionCorta": "Fragmentos de ADN que flotan libres en el plasma...",
  "explicacion": "El cfDNA, del inglés cell-free DNA, es uno de los biomarcadores... [[apoptosis]] o por [[lisis-celular]], libera fragmentos...",
  "relacionados": ["ctDNA", "apoptosis", "lisis-celular", "dnasas-plasmaticas", ...],
  "apareceComo": []
}
```

- `tipo`: `"principal"` (41 términos) o `"secundario"` (8 términos)
- `explicacion`: texto completo con `[[id-termino]]` para links internos
- `relacionados`: IDs de términos para el grafo D3
- `apareceComo`: IDs de términos en cuyas explicaciones aparece este término mencionado

---

### Capa de acceso — `src/lib/glosario.ts`

Este módulo es el único punto de entrada a los datos. Debe implementar:

```typescript
import data from '../mock/glosario_biopsialiquida.json'
import type { Glosario, Termino, Grupo, Relacion } from '../types'

const glosario = data as Glosario

// Acceso a colecciones completas
export const getTerminos   = (): Termino[]  => glosario.terminos
export const getGrupos     = (): Grupo[]    => glosario.grupos
export const getRelaciones = (): Relacion[] => glosario.relaciones

// Búsqueda por ID
export const getTerminoById = (id: string): Termino | undefined =>
  glosario.terminos.find(t => t.id === id)

export const getGrupoById = (id: string): Grupo | undefined =>
  glosario.grupos.find(g => g.id === id)

// Términos de un grupo (principales + secundarios)
export const getTerminosByGrupo = (grupoId: string): Termino[] =>
  glosario.terminos.filter(t => t.grupo === grupoId)

// Relaciones de un término (entrantes y salientes)
export const getRelacionesByTermino = (id: string): Relacion[] =>
  glosario.relaciones.filter(r => r.desde === id || r.hasta === id)

// Búsqueda full-text sobre nombre + definicionCorta
export const buscarTerminos = (query: string): Termino[] => {
  const q = query.toLowerCase()
  return glosario.terminos.filter(t =>
    t.nombre.toLowerCase().includes(q) ||
    t.definicionCorta.toLowerCase().includes(q)
  )
}

// Términos relacionados de un término (resueltos a objetos)
export const getRelacionados = (id: string): Termino[] => {
  const termino = getTerminoById(id)
  if (!termino) return []
  return termino.relacionados
    .map(rid => getTerminoById(rid))
    .filter((t): t is Termino => t !== undefined)
}
```

---

### Parser de links internos — `src/lib/parseLinks.ts`

Las explicaciones contienen referencias del tipo `[[id-termino]]`. Este parser las convierte en HTML con atributos de datos para que los componentes puedan renderizarlas como `<TermTag>` clickeables:

```typescript
import { getTerminoById } from './glosario'

export function parseLinks(texto: string): string {
  return texto.replace(/\[\[([^\]]+)\]\]/g, (_, id) => {
    const termino = getTerminoById(id)
    if (!termino) return id  // fallback: mostrar el id tal cual
    return `<span
      class="term-link"
      data-id="${termino.id}"
      data-tipo="${termino.tipo}"
      data-grupo="${termino.grupo}"
    >${termino.nombre}</span>`
  })
}
```

En el cliente, los elementos `.term-link` se enhancen con un event listener que abre la ficha del término al hacer click, sin navegación de página completa.

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
```

---

### Uso desde un componente Astro

```astro
---
// src/components/views/FichaView.astro
import { getTerminoById, getRelacionados, getGrupoById } from '../../lib/glosario'
import { parseLinks } from '../../lib/parseLinks'

const { id } = Astro.props
const termino  = getTerminoById(id)
const grupo    = termino ? getGrupoById(termino.grupo) : undefined
const relacionados = termino ? getRelacionados(id) : []
const htmlExplicacion = termino ? parseLinks(termino.explicacion) : ''
---

{termino && (
  <article>
    <h1>{termino.nombre}</h1>
    <span class="badge" style={`background: ${grupo?.color}`}>
      {grupo?.nombre}
    </span>
    <blockquote>{termino.definicionCorta}</blockquote>
    <div set:html={htmlExplicacion} />
    <section>
      <h2>Términos relacionados</h2>
      {relacionados.map(r => <TermTag id={r.id} nombre={r.nombre} tipo={r.tipo} />)}
    </section>
  </article>
)}
```

---

### Uso desde el grafo D3

```typescript
// src/components/graph/ConceptGraph.astro — script cliente
import { getTerminos, getRelaciones } from '../../lib/glosario'

const nodes = getTerminos().map(t => ({
  id:    t.id,
  label: t.nombre,
  tipo:  t.tipo,
  grupo: t.grupo
}))

const links = getRelaciones().map(r => ({
  source: r.desde,
  target: r.hasta,
  tipo:   r.tipo
}))

// Pasar nodes y links a la simulación D3 force-directed
```

---

### Sistema de links internos en `explicacion`

Dentro del texto de cada explicación, los términos secundarios se marcan con doble corchete usando el `id` del término, no el nombre:

```
"...los fragmentos liberados al [[plasma-suero]] por [[apoptosis]] o [[lisis-celular]]..."
```

El parser `parseLinks` convierte `[[id-termino]]` en un `<span class="term-link">` con atributos de datos, y los componentes cliente añaden el comportamiento de click para abrir la ficha correspondiente sin recarga de página.

> ⚠️ **Al añadir nuevos términos al JSON:** si se añade un término nuevo, asegurarse de que su `id` en el JSON coincide exactamente con las referencias `[[id]]` usadas en las explicaciones de otros términos. El parser hace la resolución en tiempo de build y devuelve el `id` en texto plano si no encuentra coincidencia.



---

## 🖥️ Vistas de la aplicación

### Vista 1 — Mapa de Relaciones (`/`)
- Grafo interactivo construido con **D3.js** (force-directed graph)
- Nodos coloreados por grupo temático
- Aristas con estilo según tipo de relación
- Click en nodo → abre ficha del término
- Hover → resalta nodo + conexiones directas, opaca el resto
- Controles: zoom, pan, filtro por grupo
- Leyenda de colores en esquina

### Vista 2 — Grupos Temáticos (`/grupos`)
- Grid de 8 cards, una por grupo
- Cada card muestra: emoji, nombre, subtítulo temático, número de términos y lista de pills de los términos que contiene
- Click en card → expande el grupo en pantalla completa
- Dentro del grupo: lista de ConceptCards ordenadas (primero principales, luego secundarios)
- Navegación entre grupos con flechas laterales

### Vista 3 — Ficha Individual (`/termino/:id`)
- Panel principal con:
  - Nombre grande + tipo (principal / secundario) como badge
  - Grupo al que pertenece (con color del grupo)
  - Definición corta destacada en caja con acento
  - Explicación completa con términos secundarios como TermTags clickeables
  - Sección "Aparece en" → lista de fichas donde este término es mencionado
  - Sección "Términos relacionados" → grid de pills clickeables
- Breadcrumb de navegación en la parte superior
- Botón de retorno al mapa o al grupo

### Vista 4 — Búsqueda Global
- Accesible desde cualquier vista con `Cmd+K` o la barra superior
- Búsqueda en tiempo real sobre nombres y definiciones cortas
- Resultados agrupados por tipo (principal / secundario)
- Navegación con teclado

---

## 📚 Contenido — Grupos y términos

### Grupo 1 — El origen del material circulante 🔬
*¿De dónde viene todo lo que detectamos en sangre?*
- **Principales:** Célula tumoral circulante, Célula neoplásica, Apoptosis, Lisis celular
- **Secundarios:** Membrana lipídica, Espacio extracelular, Núcleo celular

### Grupo 2 — El ADN que viaja en sangre 🧬
*cfDNA, su tamaño, su vida corta y por qué sobrevive*
- **Principales:** cfDNA, ctDNA, Fragmento nucleosómico, DNAsas plasmáticas
- **Secundarios:** Plasma/suero, Nucleosoma, Sangre periférica, Lisis leucocitaria

### Grupo 3 — Otros mensajeros circulantes 📡
*Lo que el parásito o la célula enferma secreta activamente*
- **Principales:** Vesícula extracelular, Exovesículas séricas, microARN, Metabolito, Analito
- **Secundarios:** Membrana lipídica, Espacio extracelular

### Grupo 4 — Las ómicas 🔭
*Leer el organismo completo de una sola vez*
- **Principales:** Ómica, Proteómica, Metabolómica, Vesiculómica, miARNómica, Metaboloma
- **Secundarios:** Analito, Plasma/suero, Degradación enzimática plasmática

### Grupo 5 — Extracción y preparación de muestra ⚗️
*Del tubo de sangre al ácido nucleico puro*
- **Principales:** Sangre periférica, Plasma/suero, Lisis leucocitaria, Columna de membrana de sílice, Tampones de lisis caotrópica
- **Secundarios:** Fragmento nucleosómico, cfDNA, DNAsas plasmáticas

### Grupo 6 — Técnicas de detección y amplificación 🛠️
*Las herramientas que convierten una señal débil en un resultado*
- **Principales:** NGS, Metagenómica clínica no invasiva, Depleción del genoma, Sistema CRISPR-Cas, Nucleasas Cas, LAMP, RPA, RPA con flujo lateral, ADN polimerasa, Electroforesis, Fluorómetros
- **Secundarios:** cfDNA, Fragmento nucleosómico, Analito

### Grupo 7 — Biología parasitaria circulante 🦠
*Entender al parásito para entender qué deja en sangre*
- **Principales:** Diversidad taxonómica, Protozoo hemático, Ciclo intraeritrocitario, Nematodo intestinal, Helminto tisular, Parasitemia periférica, ADN del kinetoplasto
- **Secundarios:** Lisis celular, cfDNA, Vesícula extracelular, Espacio extracelular

### Grupo 8 — Contexto clínico 🏥
*Términos del mundo clínico que rodean al diagnóstico*
- **Principales:** Recidiva, Iatrogenia, Sangre periférica
- **Secundarios:** Parasitemia periférica, Apoptosis, Lisis celular

---

## 🗺️ Mapa de relaciones clave

```
cfDNA ──────────────── originado por ──── Apoptosis
cfDNA ──────────────── originado por ──── Lisis celular
cfDNA ──────────────── vive en ──────────  Plasma/suero
cfDNA ──────────────── degradado por ─── DNAsas plasmáticas
cfDNA ──────────────── tamaño define ─── Fragmento nucleosómico
Fragmento nucleosómico ── protegido por ─ Nucleosoma
ctDNA ──────────────── es un tipo de ─── cfDNA
ctDNA ──────────────── procede de ──────  Célula neoplásica
Vesícula extracelular ── compuesta de ── Membrana lipídica
Vesícula extracelular ── contiene ───── microARN
Vesícula extracelular ── contiene ───── Metabolito
Vesícula extracelular ── estudiada por ─ Vesiculómica
microARN ───────────── estudiado por ── miARNómica
Metabolito ─────────── estudiado por ── Metabolómica
Proteómica ─────────── estudia ────────  Analito (proteínas)
Ómica ──────────────── engloba ─────────  Proteómica, Metabolómica, Vesiculómica, miARNómica
NGS ────────────────── requiere ────────  Depleción del genoma
NGS ────────────────── analiza ─────────  cfDNA
CRISPR-Cas ─────────── usa ─────────────  Nucleasas Cas
LAMP ───────────────── alternativa a ─── NGS (campo/recursos limitados)
RPA ────────────────── combinable con ─── RPA con flujo lateral
ADN del kinetoplasto ── es tipo de ─── cfDNA (parasitario)
Parasitemia periférica ─ detectada en ─ Sangre periférica
Lisis leucocitaria ──── contamina ───── cfDNA (ruido analítico)
```

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
- Crear `src/types/index.ts` con los tipos `Termino`, `Grupo`, `Relacion`, `Glosario`
- Verificar que `tsconfig.json` tiene `"resolveJsonModule": true` para el import del JSON

### Fase 3 — Componentes base
- `TermTag.astro` — pill clickeable con color según tipo
- `ConceptCard.astro` — tarjeta de concepto con definición corta
- `SearchBar.astro` — búsqueda con `Cmd+K`
- `BreadCrumb.astro` — navegación contextual
- `RelationBadge.astro` — badge de tipo de relación

### Fase 4 — Vistas principales
- `FichaView.astro` — ficha individual completa
- `GrupoView.astro` — vista de grupo expandido
- `MapaView.astro` — grafo D3 interactivo

### Fase 5 — Layout y navegación
- `Header.astro` con búsqueda global
- `Sidebar.astro` con lista de grupos
- Routing entre vistas (con state management sin framework — vanilla JS + History API)

### Fase 6 — Pulido visual
- Animaciones de entrada (stagger)
- Hover states y transiciones
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
| Tipado | TypeScript | Seguridad en el modelo de datos del glosario |
| Estado/Routing | Vanilla JS + History API | Sin necesidad de React/Vue para esta escala; Astro lo gestiona bien |
| Fuentes | Google Fonts / Fontsource | Carga local, sin dependencia de red externa |
| Datos | JSON estático en `src/mock/` | Fuente única de verdad; sin base de datos; fácil de mantener y versionar |
| Import JSON | `resolveJsonModule: true` en tsconfig | Permite importar el JSON como módulo tipado directamente en TypeScript |

---

## 🔮 Posibles extensiones futuras

- **Modo quiz**: el sistema te muestra la definición y tienes que adivinar el término
- **Progreso de estudio**: marca qué términos ya dominas (localStorage)
- **Vista de mapa mental** alternativa al grafo D3
- **Exportar ficha** individual como imagen para repasar offline
- **Modo presentación**: navegar fichas como slides para repasar antes de la defensa

---

*Proyecto de estudio personal — TFM Ana María Cárdenas Sánchez, UGR 2025*
