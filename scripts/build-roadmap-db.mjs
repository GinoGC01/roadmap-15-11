/**
 * Genera src/db/roadmap.json a partir de roadmap.md.
 *
 *   node scripts/build-roadmap-db.mjs
 *
 * El JSON resultante es la fuente de verdad de la app: si se edita roadmap.md,
 * hay que volver a correr este script.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = path.join(ROOT, 'roadmap.md')
const TARGET = path.join(ROOT, 'src', 'db', 'roadmap.json')

const STAGE_COLORS = [
  '#a9c4b1',
  '#aebfd6',
  '#d5b6c4',
  '#c3bce0',
  '#c3d6b8',
  '#dfcda4',
  '#d6bfae',
]

const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie']

/* ------------------------------------------------------------------ */
/* Helpers de markdown inline                                          */
/* ------------------------------------------------------------------ */

const LINK_RE = /\[([^\]]*)\]\(([^)\s]+)\)/g

function extractLinks(raw) {
  return [...raw.matchAll(LINK_RE)].map((m) => ({ label: m[1].trim(), url: m[2] }))
}

function toPlain(raw) {
  return raw
    .replace(LINK_RE, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function toText(raw) {
  return { raw: raw.trim(), text: toPlain(raw) }
}

/* ------------------------------------------------------------------ */
/* Catálogo de recursos: resuelve anclas escritas sin link             */
/* ------------------------------------------------------------------ */

const RESOURCE_CATALOG = [
  [/^6\.006\s*L/i, 'MIT 6.006 · Videos', 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/video_galleries/lecture-videos'],
  [/^18\.06\s*L/i, 'MIT 18.06 · Videos', 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/video_galleries/video-lectures/'],
  [/^3b1b LA/i, '3Blue1Brown · Álgebra lineal', 'https://www.3blue1brown.com/topics/linear-algebra'],
  [/^3b1b Cálculo/i, '3Blue1Brown · Cálculo', 'https://www.3blue1brown.com/topics/calculus'],
  [/^3b1b NN/i, '3Blue1Brown · Redes neuronales', 'https://www.3blue1brown.com/topics/neural-networks'],
  [/^MLCC/i, 'Google ML Crash Course', 'https://developers.google.com/machine-learning/crash-course'],
  [/^LeetCode \/ NeetCode/i, 'LeetCode · Problemas', 'https://leetcode.com/problemset/'],
  [/^LeetCode/i, 'LeetCode · Problemas', 'https://leetcode.com/problemset/'],
  [/^NeetCode/i, 'NeetCode Roadmap', 'https://neetcode.io/roadmap'],
  [/^VisuAlgo/i, 'VisuAlgo', 'https://visualgo.net/en'],
  [/^HackerRank/i, 'HackerRank · Algorithms', 'https://www.hackerrank.com/domains/algorithms'],
  [/^Kaggle: Intro to Machine Learning/i, 'Kaggle · Intro to Machine Learning', 'https://www.kaggle.com/learn/intro-to-machine-learning'],
  [/^Kaggle Intro to ML/i, 'Kaggle · Intro to Machine Learning', 'https://www.kaggle.com/learn/intro-to-machine-learning'],
  [/^Kaggle: Intermediate ML/i, 'Kaggle · Intermediate ML', 'https://www.kaggle.com/learn/intermediate-machine-learning'],
  [/^Kaggle: Intro to Deep Learning/i, 'Kaggle · Intro to Deep Learning', 'https://www.kaggle.com/learn/intro-to-deep-learning'],
  [/^Kaggle Learn: Pandas/i, 'Kaggle Learn · Pandas', 'https://www.kaggle.com/learn/pandas'],
  [/^Learn the Basics/i, 'PyTorch · Learn the Basics', 'https://pytorch.org/tutorials/beginner/basics/intro.html'],
  [/^PyTorch tutorials/i, 'PyTorch · Tutorials', 'https://pytorch.org/tutorials/'],
  [/^HF LLM Course/i, 'Hugging Face · LLM Course', 'https://huggingface.co/learn/llm-course'],
  [/^HF Agents Course/i, 'Hugging Face · Agents Course', 'https://huggingface.co/learn/agents-course'],
  [/^Karpathy/i, 'Karpathy · micrograd', 'https://www.youtube.com/watch?v=VMj-3S1tku0'],
  [/^Ragas/i, 'Ragas', 'https://docs.ragas.io/'],
  [/^LlamaIndex/i, 'LlamaIndex Docs', 'https://docs.llamaindex.ai/en/stable/'],
  [/^OpenAI Docs/i, 'OpenAI Docs', 'https://platform.openai.com/docs/overview'],
  [/^ADRs/i, 'Architecture Decision Records', 'https://adr.github.io/'],
  [/^System Design Primer/i, 'System Design Primer', 'https://github.com/donnemartin/system-design-primer'],
  [/^Vitest/i, 'Vitest', 'https://vitest.dev/guide/'],
  [/^AWS Skill Builder/i, 'AWS Skill Builder', 'https://skillbuilder.aws/'],
  [/^AWS: seguridad/i, 'AWS · Seguridad', 'https://docs.aws.amazon.com/security/'],
  [/^VPC docs/i, 'AWS VPC', 'https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html'],
  [/^EC2 docs/i, 'AWS EC2', 'https://docs.aws.amazon.com/ec2/'],
  [/^S3 docs/i, 'Amazon S3', 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html'],
  [/^RDS docs/i, 'Amazon RDS', 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html'],
  [/^IAM docs/i, 'AWS IAM', 'https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html'],
  [/^Elastic Load Balancing/i, 'Elastic Load Balancing', 'https://docs.aws.amazon.com/elasticloadbalancing/'],
  [/^Route 53/i, 'Route 53', 'https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html'],
  [/^CloudWatch/i, 'Amazon CloudWatch', 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html'],
  [/^Pricing Calculator/i, 'AWS Pricing Calculator', 'https://calculator.aws/'],
  [/^Row Level Security/i, 'PostgreSQL · Row Level Security', 'https://www.postgresql.org/docs/current/ddl-rowsecurity.html'],
  [/^BullMQ/i, 'BullMQ', 'https://docs.bullmq.io/'],
  [/^GitHub Actions/i, 'GitHub Actions', 'https://docs.github.com/en/actions'],
  [/^Terraform/i, 'Terraform', 'https://developer.hashicorp.com/terraform/docs'],
  [/^OWASP/i, 'OWASP Top 10', 'https://owasp.org/www-project-top-ten/'],
  [/^OpenTelemetry/i, 'OpenTelemetry', 'https://opentelemetry.io/docs/getting-started/'],
  [/^Prometheus/i, 'Prometheus', 'https://prometheus.io/docs/introduction/first_steps/'],
  [/^Grafana/i, 'Grafana', 'https://grafana.com/docs/grafana/latest/getting-started/'],
  [/^k6/i, 'k6', 'https://grafana.com/docs/k6/latest/'],
  [/^OpenStax/i, 'OpenStax · Introductory Statistics', 'https://openstax.org/details/books/introductory-statistics-2e'],
  [/^Khan/i, 'Khan Academy', 'https://www.khanacademy.org/'],
  [/^Docker Storage/i, 'Docker · Storage', 'https://docs.docker.com/engine/storage/'],
  [/^Docker Networking/i, 'Docker · Networking', 'https://docs.docker.com/engine/network/'],
  [/^Docker Compose/i, 'Docker Compose', 'https://docs.docker.com/compose/'],
  [/^Docker/i, 'Docker · Get Started', 'https://docs.docker.com/get-started/'],
  [/^Guía Docker/i, 'Docker · Node.js', 'https://docs.docker.com/guides/nodejs/'],
  [/^pgvector/i, 'pgvector', 'https://github.com/pgvector/pgvector'],
  [/^Wireshark/i, 'Wireshark User Guide', 'https://www.wireshark.org/docs/wsug_html_chunked/'],
  [/^Linux Journey/i, 'Linux Journey', 'https://linuxjourney.com/'],
  [/^SQLBolt/i, 'SQLBolt', 'https://sqlbolt.com/'],
  [/^PostgreSQL/i, 'PostgreSQL · Documentación', 'https://www.postgresql.org/docs/current/'],
  [/^NumPy/i, 'NumPy', 'https://numpy.org/doc/stable/user/quickstart.html'],
  [/^Refactoring Guru \(/i, 'Refactoring Guru · Design Patterns', 'https://refactoring.guru/design-patterns'],
  [/^Use The Index, Luke/i, 'Use The Index, Luke', 'https://use-the-index-luke.com/'],
  [/^Tech Interview Handbook/i, 'Tech Interview Handbook', 'https://www.techinterviewhandbook.org/'],
]

function matchCatalog(text) {
  const cleaned = text.replace(/^\(\d+\)\s*/, '').trim()
  for (const [pattern, label, url] of RESOURCE_CATALOG) {
    if (pattern.test(cleaned)) return { label, url }
  }
  return null
}

/**
 * Divide un texto en segmentos y resuelve los que no tienen link contra el catálogo.
 * Devuelve segmentos con su link asociado (o null).
 */
function resolveSegments(raw) {
  return raw
    .split(/\s\+\s/)
    .map((segment) => {
      const trimmed = segment.trim()
      const explicit = extractLinks(trimmed)
      if (explicit.length > 0) {
        return { text: toPlain(trimmed), links: explicit }
      }
      const catalog = matchCatalog(toPlain(trimmed))
      return {
        text: toPlain(trimmed),
        links: catalog ? [{ label: catalog.label, url: catalog.url }] : [],
      }
    })
    .filter((segment) => segment.text.length > 0)
}

function buildBlock(raw) {
  const segments = resolveSegments(raw)
  const links = []
  for (const segment of segments) {
    for (const link of segment.links) {
      if (!links.some((l) => l.url === link.url)) links.push(link)
    }
  }
  return { ...toText(raw), links, segments }
}

/* ------------------------------------------------------------------ */
/* Parsing del documento                                                */
/* ------------------------------------------------------------------ */

const markdown = fs.readFileSync(SOURCE, 'utf8')
const lines = markdown.split(/\r?\n/)

function isTableSeparator(line) {
  return /^\|[\s:|-]+\|$/.test(line.trim())
}

function splitRow(line) {
  return line
    .split('|')
    .slice(1, -1)
    .map((cell) => cell.trim())
}

function readTable(startIndex) {
  const rows = []
  let i = startIndex
  while (i < lines.length && lines[i].trim().startsWith('|')) {
    if (!isTableSeparator(lines[i])) rows.push(splitRow(lines[i]))
    i++
  }
  return { rows, nextIndex: i }
}

const meta = {
  title: '',
  profile: '',
  pace: { daysPerWeek: 5, hoursPerDay: 2.5, hoursPerWeek: 12.5, totalHours: 350 },
  journey: [],
  rules: [],
  threads: [],
  library: [],
  stageSummary: [],
}

const stages = []

let stage = null
let week = null
let section = null
let i = 0

function closeWeek() {
  if (!week) return
  const objective = week.meta.find((line) => line.startsWith('**Objetivo:**'))
  week.objective = objective ? toText(objective.slice('**Objetivo:**'.length).trim()) : null

  const deliverableHeader = week.meta.find((line) => /^\*\*Entregables?( final)?:/.test(line))
  const bullets = week.meta.filter((line) => /^- \*\*(Por qué|Impacto|Qué refleja):\*\*/.test(line))
  const steps = week.meta
    .filter((line) => /^\d+\.\s/.test(line))
    .map((line) => toText(line.replace(/^\d+\.\s*/, '')))

  let deliverable = null
  if (deliverableHeader) {
    const inner = deliverableHeader
      .replace(/^\*\*Entregables?( final)?:/, '')
      .replace(/\*\*$/, '')
      .trim()
    const codeNames = [...inner.matchAll(/`([^`]+)`/g)].map((m) => m[1])
    const names = codeNames.length > 0 ? codeNames : [inner.replace(/\s*\(.*\)$/, '').trim()]
    const bullet = (label) => {
      const found = bullets.find((line) => line.startsWith(`- **${label}:**`))
      return found ? toText(found.slice(`- **${label}:**`.length).trim()) : null
    }
    deliverable = {
      names,
      label: names.join(' + '),
      isFinal: /^\*\*Entregable final:/.test(deliverableHeader),
      why: bullet('Por qué'),
      impact: bullet('Impacto'),
      reflects: bullet('Qué refleja'),
      steps,
    }
  }

  week.deliverable = deliverable
  week.meta = undefined
  week = null
}

while (i < lines.length) {
  const line = lines[i]

  const stageMatch = line.match(/^# ETAPA (\d+):\s*(.+?)\s*\(sem (\d+)[–-](\d+)\)\s*$/)
  if (stageMatch) {
    closeWeek()
    stage = {
      id: `etapa-${stageMatch[1]}`,
      number: Number(stageMatch[1]),
      title: stageMatch[2].trim(),
      weekFrom: Number(stageMatch[3]),
      weekTo: Number(stageMatch[4]),
      color: STAGE_COLORS[Number(stageMatch[1]) - 1] ?? '#aebfd6',
      note: null,
      outcome: '',
      evaluation: null,
      weeks: [],
    }
    stages.push(stage)
    week = null
    section = 'stage'
    i++
    continue
  }

  const weekMatch = line.match(/^## Semana (\d+):\s*(.+)$/)
  if (weekMatch) {
    closeWeek()
    week = {
      id: `sem-${String(weekMatch[1]).padStart(2, '0')}`,
      number: Number(weekMatch[1]),
      title: weekMatch[2].trim(),
      days: [],
      meta: [],
    }
    if (stage) stage.weeks.push(week)
    section = 'week'
    i++
    continue
  }

  if (line.startsWith('## ')) {
    closeWeek()
    section = line.slice(3).trim()
    i++
    continue
  }

  if (line.startsWith('|')) {
    const { rows, nextIndex } = readTable(i)
    i = nextIndex
    if (section === 'week' && week) {
      for (const row of rows) {
        if (row[0] === 'Día' || row[0] === 'Dia') continue
        const weekday = row[0]
        const anchorRaw = row[1] ?? ''
        const practiceRaw = row[2] ?? ''
        const challengeRaw = row[3] ?? ''

        const threads = []
        if (/^\*\*SQL:?\*\*/.test(challengeRaw)) threads.push('sql')
        if (/^\*\*Proyecto/.test(practiceRaw)) threads.push('proyecto-b2b-ai-knowledge-platform')

        week.days.push({
          id: `${week.id}-${weekday.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`,
          weekday,
          weekdayIndex: WEEKDAYS.indexOf(weekday) + 1,
          anchor: buildBlock(anchorRaw),
          practice: buildBlock(practiceRaw),
          challenge: buildBlock(challengeRaw),
          threads,
        })
      }
    } else if (section === 'Cómo es cada jornada (2 h 30)') {
      for (const row of rows) {
        if (row[0] === 'Bloque') continue
        meta.journey.push({ block: row[0], time: row[1], description: toText(row[2]) })
      }
    } else if (section === 'Etapas') {
      for (const row of rows) {
        if (row[0] === 'Etapa') continue
        meta.stageSummary.push({
          number: Number(row[0].split('.')[0]),
          title: row[0].split('.').slice(1).join('.').trim(),
          weeks: row[1],
          outcome: row[2],
        })
      }
    } else if (section === 'Biblioteca base (cursos largos; en las tablas "L" = número de clase)') {
      for (const row of rows) {
        if (row[0] === 'Recurso') continue
        meta.library.push({
          name: row[0],
          description: toText(row[2]),
          links: extractLinks(row[1]).map((l) => ({ label: l.label, url: l.url })),
        })
      }
    }
    continue
  }

  const trimmed = line.trim()

  if (trimmed.startsWith('**Perfil objetivo:**')) {
    meta.profile = trimmed.slice('**Perfil objetivo:**'.length).trim()
    i++
    continue
  }

  if (trimmed.startsWith('**Ritmo:**')) {
    const paceText = trimmed.slice('**Ritmo:**'.length).trim()
    const days = paceText.match(/(\d+)\s*jornadas/)
    const day = paceText.match(/(\d+(?:[.,]\d+)?)\s*h\s*(\d+)/)
    const week = paceText.match(/\(([\d.,]+)\s*h\/semana\)/)
    const total = paceText.match(/\*\*Carga total:\*\*\s*(\d+)\s*h/)
    if (days) meta.pace.daysPerWeek = Number(days[1])
    if (day) meta.pace.hoursPerDay = Number(day[1].replace(',', '.')) + Number(day[2]) / 60
    if (week) meta.pace.hoursPerWeek = Number(week[1].replace(',', '.'))
    if (total) meta.pace.totalHours = Number(total[1])
    i++
    continue
  }

  if (section === 'Reglas' && trimmed.startsWith('- ')) {
    meta.rules.push(toText(trimmed.slice(2)))
    i++
    continue
  }

  if (section === 'Hilos transversales' && trimmed.startsWith('- ')) {
    const body = trimmed.slice(2)
    const threadMatch = body.match(/^\*\*([^*]+):\*\*\s*(.*)$/)
    const name = threadMatch ? threadMatch[1].trim() : body.replace(/\*\*|\*/g, '')
    const description = threadMatch ? toText(threadMatch[2].trim()) : toText(body)
    const id = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-')
    meta.threads.push({ id, name, description })
    i++
    continue
  }

  if (stage && week === null && trimmed && !trimmed.startsWith('#') && stage.note === null) {
    stage.note = buildBlock(trimmed)
    i++
    continue
  }

  if (stage && week && trimmed) {
    week.meta.push(trimmed)
    i++
    continue
  }

  i++
}

closeWeek()

// Evaluaciones de etapa (están al final de cada etapa, fuera de las semanas).
{
  let currentStage = null
  let pending = null
  for (const line of lines) {
    const stageMatch = line.match(/^# ETAPA (\d+):/)
    if (stageMatch) {
      currentStage = stages.find((s) => s.number === Number(stageMatch[1])) ?? null
      pending = null
      continue
    }
    if (/^## Semana /.test(line)) {
      pending = null
      continue
    }
    const evaluationMatch = line.match(/^\*\*Evaluaci[oó]n (?:de etapa|final):\*\*\s*(.*)$/)
    if (evaluationMatch && currentStage) {
      currentStage.evaluation = {
        title: line.startsWith('**Evaluación final:**') ? 'Evaluación final' : 'Evaluación de etapa',
        ...toText(evaluationMatch[1]),
      }
      pending = null
      continue
    }
    pending = null
  }
}

for (const s of stages) {
  const summary = meta.stageSummary.find((entry) => entry.number === s.number)
  s.outcome = summary ? summary.outcome : ''
}

/* ------------------------------------------------------------------ */
/* Validación + escritura                                              */
/* ------------------------------------------------------------------ */

const weekCount = stages.reduce((acc, s) => acc + s.weeks.length, 0)
const dayCount = stages.reduce((acc, s) => acc + s.weeks.reduce((w, wk) => w + wk.days.length, 0), 0)

const problems = []
if (stages.length !== 7) problems.push(`se esperaban 7 etapas y hay ${stages.length}`)
if (weekCount !== 28) problems.push(`se esperaban 28 semanas y hay ${weekCount}`)
if (dayCount !== 140) problems.push(`se esperaban 140 jornadas y hay ${dayCount}`)
for (const s of stages) {
  for (const wk of s.weeks) {
    if (wk.days.length !== 5) problems.push(`${wk.id} tiene ${wk.days.length} jornadas`)
    if (!wk.objective) problems.push(`${wk.id} sin objetivo`)
    if (!wk.deliverable) problems.push(`${wk.id} sin entregable`)
    if (wk.deliverable && wk.deliverable.steps.length === 0) problems.push(`${wk.id} sin guía de armado`)
  }
  if (!s.evaluation) problems.push(`${s.id} sin evaluación de etapa`)
}

if (problems.length > 0) {
  console.error('Validación fallida:')
  for (const problem of problems) console.error('  -', problem)
  process.exit(1)
}

const payload = {
  version: 1,
  generatedFrom: 'roadmap.md',
  meta: {
    ...meta,
    title: 'Roadmap completo: 28 semanas (sin plazo fijo)',
  },
  stages,
}

fs.mkdirSync(path.dirname(TARGET), { recursive: true })
fs.writeFileSync(TARGET, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')

const unresolved = stages
  .flatMap((s) => s.weeks)
  .flatMap((w) => w.days)
  .filter((d) => d.anchor.links.length === 0)

console.log(`roadmap.json generado en ${path.relative(ROOT, TARGET)}`)
console.log(`  ${stages.length} etapas · ${weekCount} semanas · ${dayCount} jornadas`)
console.log(`  ${stages.reduce((a, s) => a + s.weeks.length, 0)} entregables · hilos: ${meta.threads.length}`)
console.log(`  anclas sin link: ${unresolved.length}${unresolved.length ? ` (${unresolved.map((d) => d.id).join(', ')})` : ''}`)
