import type { CaseStudy } from '#shared/types/case-study'

// What Mallow (the little guy's chat) knows: his instructions plus Matt's
// bio, roles and CV (server/assets/mallow/about.md), and the published case
// studies from Craft. Server-only; none of it is sent to the browser.

function plain(html: string) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function describe(study: CaseStudy) {
  const lines = [`## ${study.title} (${study.label})`]
  if (study.date) lines.push(`Date: ${study.date}`)
  if (study.disciplines.length) {
    lines.push(`Disciplines: ${study.disciplines.join(', ')}`)
  }
  if (study.link) lines.push(`Link: ${study.link.replace(/^https?:\/\//, '')}`)
  if (study.intro) lines.push(study.intro)
  for (const node of study.body) {
    if (node.kind === 'img') continue
    const text = plain(node.html)
    if (!text) continue
    lines.push(node.kind === 'p' ? text : `### ${text}`)
  }
  return lines.join('\n')
}

// Craft is rate limited and shouldn't be called per question, so the notes
// are cached for a while (images aren't needed, so no R2 sync either).
const caseStudyNotes = defineCachedFunction(
  async () => {
    const items = (await getCraftItems()).filter(isPublished).sort(byOrder)
    return items
      .map((item) => toCaseStudy(item, new Map()))
      .filter((study): study is CaseStudy => study !== null)
      .map(describe)
      .join('\n\n')
  },
  { name: 'mallow-case-studies', maxAge: 600 },
)

export async function mallowInstructions() {
  const about =
    await useStorage('assets:server').getItem<string>('mallow/about.md')
  let studies = ''
  try {
    studies = await caseStudyNotes()
  } catch (error) {
    console.error('[mallow] case studies unavailable', error)
  }
  return [
    String(about ?? ''),
    '# Case studies on the site',
    'Each one opens as a panel on the desk.',
    studies || '(Unavailable right now.)',
  ].join('\n\n')
}
