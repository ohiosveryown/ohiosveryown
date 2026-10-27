import MarkdownIt from 'markdown-it'
import type { BodyNode } from '#shared/types/case-study'
import type { CraftBlock } from './craft'

// Inline-only, raw HTML escaped: Craft markdown can't inject markup.
const md = new MarkdownIt({ html: false, linkify: false })

const defaultLinkOpen =
  md.renderer.rules.link_open ??
  ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options))

md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx]!
  if (/^https?:/.test(token.attrGet('href') ?? '')) {
    token.attrSet('target', '_blank')
    token.attrSet('rel', 'noopener')
  }
  return defaultLinkOpen(tokens, idx, options, env, self)
}

// Craft-only tags (<highlight>, <caption>, <callout>, <comment id="…">): keep
// their text, drop the tags.
const CRAFT_TAGS = /<\/?(?:highlight|caption|callout|comment)\b[^>]*>/g
// block:// and date:// point inside Craft; keep the link text only.
const INTERNAL_LINKS = /\[([^\]]*)\]\((?:block|date):\/\/[^)]*\)/g
// textStyle already gives the level.
const HEADING_MARKS = /^#{1,6}\s+/
// Footnotes: "[^1]" in the text (markdown-it leaves it as is) links to the
// note that starts "[1] ".
const FOOTNOTE_MARK = /\[\^(\d{1,3})\]/g
const NOTE_START = /^\[(\d{1,3})\]\s+/

// Craft keeps a space selected along with the text inside the markers
// ("*National Treasure, *Nicolas"), and markdown won't close emphasis on a
// space, so the asterisks would show. Move the space outside them. Only
// where the text on the other side is tight against its marker, so a lone
// "2 * 3" is left alone.
const SPACE_BEFORE_CLOSE =
  /(?<!\*)(\*{1,2})(?=[^*\s])([^*]*?[^*\s])(\s+)\1(?=[^*\s])/g
const SPACE_AFTER_OPEN =
  /(?<=[^*\s]|^)(\*{1,2})(\s+)(?=[^*\s])([^*]*?[^*\s])\1(?!\*)/g

// A paragraph that's only a link to the site with ?ask=…, written in Craft
// as [Tell Mallow](https://ohiosveryown.co/?ask=Mallow%2C%20hi), is a button
// that asks Mallow that question. (The link itself works too: the home page
// asks it on arrival.)
const ASK_LINK =
  /^\[([^\]]+)\]\((?:https?:\/\/(?:www\.)?ohiosveryown\.co)?\/?\?ask=([^)\s]+)\)$/
const MAX_QUESTION = 500

function askOf(markdown: string) {
  const match = markdown.trim().match(ASK_LINK)
  if (!match) return undefined
  let question: string
  try {
    question = decodeURIComponent(match[2]!.replace(/\+/g, ' ')).trim()
  } catch {
    return undefined
  }
  const label = renderInline(match[1]!).replace(/<[^>]*>/g, '')
  if (!question || !label || question.length > MAX_QUESTION) return undefined
  return { label, question }
}

// The decoration already says it's a quote.
const QUOTE_MARK = /^>\s?/

// A paragraph that's all italics, the way image captions are written.
export function captionOf(block: CraftBlock | undefined) {
  if (block?.type !== 'text' || block.textStyle) return undefined
  const match = (block.markdown ?? '').trim().match(/^\*([^*]+)\*$/)
  return match ? renderInline(match[1]!) : undefined
}

function renderInline(markdown: string) {
  return md
    .renderInline(
      markdown
        .replace(CRAFT_TAGS, '')
        .replace(INTERNAL_LINKS, '$1')
        .replace(HEADING_MARKS, '')
        .replace(SPACE_BEFORE_CLOSE, '$1$2$1$3')
        .replace(SPACE_AFTER_OPEN, '$2$1$3$1'),
    )
    .trim()
    .replace(
      FOOTNOTE_MARK,
      '<sup class="fn-ref"><a href="#fn-$1" data-fn="$1">$1</a></sup>',
    )
}

const TEXT_KINDS: Record<string, 'h3' | 'h4' | 'p'> = {
  h1: 'h3',
  h2: 'h3',
  h3: 'h4',
  h4: 'h4',
  body: 'p',
}

// Whitelist: headings, subheadings, paragraphs, quotes, images, videos and
// dividers.
// Everything else (lists, captions, pages, cards, tables, code, files…) is
// dropped.
export function toBody(
  blocks: CraftBlock[],
  skip: (string | undefined)[],
  imageFor: (block: CraftBlock & { url: string }) => {
    src: string
    aspectRatio?: number
  },
  videoFor: (block: CraftBlock & { url: string }) => {
    src: string
    aspectRatio?: number
  },
): BodyNode[] {
  const body: BodyNode[] = []
  for (const block of blocks) {
    if (skip.includes(block.id)) continue

    if (block.type === 'image') {
      if (!block.url) continue
      const { src, aspectRatio } = imageFor(
        block as CraftBlock & { url: string },
      )
      body.push({ kind: 'img', src, alt: block.altText ?? '', aspectRatio })
      continue
    }

    // Dividers, as a break between sections. Not at the very start, or
    // twice in a row.
    if (block.type === 'line') {
      if (body.length && body.at(-1)!.kind !== 'break') {
        body.push({ kind: 'break' })
      }
      continue
    }

    if (block.type === 'video') {
      if (!block.url) continue
      const { src, aspectRatio } = videoFor(
        block as CraftBlock & { url: string },
      )
      body.push({ kind: 'video', src, aspectRatio })
      continue
    }

    if (block.type !== 'text') continue
    if (block.listStyle && block.listStyle !== 'none') continue
    const kind = TEXT_KINDS[block.textStyle ?? 'body']
    if (!kind) continue
    // A quote block's markdown starts with "> " (its decoration says so too).
    const quote =
      kind === 'p' && (block.decorations?.includes('quote') ?? false)
    // An italic line right under an image is its caption.
    const caption =
      kind === 'p' && !quote && body.at(-1)?.kind === 'img'
        ? captionOf(block)
        : undefined
    if (caption) {
      body.push({ kind: 'caption', html: caption })
      continue
    }
    const markdown = (block.markdown ?? '').replace(quote ? QUOTE_MARK : '', '')
    const asks = kind === 'p' && !quote ? askOf(markdown) : undefined
    if (asks) {
      body.push({ kind: 'ask', ...asks })
      continue
    }
    const note = kind === 'p' && !quote ? markdown.match(NOTE_START) : null
    if (note) {
      const html = renderInline(markdown.slice(note[0].length))
      if (html) body.push({ kind: 'note', n: Number(note[1]), html })
      continue
    }
    const html = renderInline(markdown)
    if (html) body.push({ kind: quote ? 'quote' : kind, html })
  }
  // Nor at the very end.
  if (body.at(-1)?.kind === 'break') body.pop()
  return body
}
