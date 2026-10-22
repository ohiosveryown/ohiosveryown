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

function renderInline(markdown: string) {
  return md
    .renderInline(
      markdown
        .replace(CRAFT_TAGS, '')
        .replace(INTERNAL_LINKS, '$1')
        .replace(HEADING_MARKS, ''),
    )
    .trim()
}

const TEXT_KINDS: Record<string, 'h3' | 'h4' | 'p'> = {
  h1: 'h3',
  h2: 'h3',
  h3: 'h4',
  h4: 'h4',
  body: 'p',
}

// Whitelist: headings, subheadings, paragraphs, images and videos.
// Everything else (lists, captions, pages, cards, tables, code, files…) is
// dropped.
export function toBody(
  blocks: CraftBlock[],
  skip: string | undefined,
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
    if (block.id === skip) continue

    if (block.type === 'image') {
      if (!block.url) continue
      const { src, aspectRatio } = imageFor(
        block as CraftBlock & { url: string },
      )
      body.push({ kind: 'img', src, alt: block.altText ?? '', aspectRatio })
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
    const html = renderInline(block.markdown ?? '')
    if (html) body.push({ kind, html })
  }
  return body
}
