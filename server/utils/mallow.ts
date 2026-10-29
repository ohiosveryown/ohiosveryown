import type { CaseStudy } from '#shared/types/case-study'

// What Mallow (the little guy's chat) knows: his instructions plus Matt's
// bio, roles and CV (server/assets/mallow/about.md), and the published case
// studies from Craft. Server-only; none of it is sent to the browser.


// The desk's labels (its colored dots), as Mallow should name them.
const CATEGORY_NAMES = {
  essay: 'Essay',
  personal: 'Personal project',
  professional: 'Professional project',
} as const

function describe(study: CaseStudy) {
  const lines = [`## ${study.title} (${study.label})`, `Slug: ${study.slug}`]
  if (study.category) lines.push(`Kind: ${CATEGORY_NAMES[study.category]}`)
  if (study.date) lines.push(`Date: ${study.date}`)
  if (study.disciplines.length) {
    lines.push(`Topics: ${study.disciplines.join(', ')}`)
  }
  if (study.link) lines.push(`Link: ${study.link.replace(/^https?:\/\//, '')}`)
  if (study.intro) lines.push(study.intro)
  if (study.summary) lines.push(`Summary: ${study.summary}`)
  for (const node of study.body) {
    if (
      node.kind === 'img' ||
      node.kind === 'video' ||
      node.kind === 'break' ||
      node.kind === 'ask'
    )
      continue
    const text = plainText(node.html)
    if (!text) continue
    lines.push(
      node.kind === 'p' ||
        node.kind === 'quote' ||
        node.kind === 'caption' ||
        node.kind === 'note'
        ? text
        : `### ${text}`,
    )
  }
  return lines.join('\n')
}

// Craft is rate limited and shouldn't be called per question, so the case
// studies are cached for a while (images aren't needed, so no R2 sync
// either).
const publishedStudies = defineCachedFunction(
  async () => {
    const items = (await getCraftItems()).filter(isPublished).sort(byOrder)
    return items
      .map((item) => toCaseStudy(item, new Map()))
      .filter((study): study is CaseStudy => study !== null)
  },
  { name: 'mallow-studies', maxAge: 600 },
)

async function caseStudyNotes() {
  return (await publishedStudies()).map(describe).join('\n\n')
}

// Asked for everything Matt has written, Mallow puts this where the list
// goes (see about.md) and the ask route fills it in (mallowIndex): every
// post is there, none made up, and the list costs no reply tokens.
export const INDEX_MARKER = '{{index}}'

// Every post as a link the chat opens, newest first (by Published on, like
// the desk's list on small screens). Each is a paragraph of its own, for
// the chat's gap between paragraphs, after one ending Mallow's line
// (extra line breaks there make no difference).
export async function mallowIndex() {
  try {
    const studies = await publishedStudies()
    const links = [...studies]
      .sort((a, b) => (b.publishedOn ?? '').localeCompare(a.publishedOn ?? ''))
      .map((study) => `[${study.title}](${study.slug})`)
    return `\n\n${links.join('\n\n')}`
  } catch (error) {
    console.error('[mallow] index unavailable', error)
    return "(I can't find them right now.)"
  }
}

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
