// The only shapes the client receives; Craft's raw blocks stay on the server.
export type BodyNode =
  | { kind: 'h3' | 'h4' | 'p' | 'quote' | 'caption'; html: string }
  | { kind: 'img'; src: string; alt: string; aspectRatio?: number }
  | { kind: 'video'; src: string; aspectRatio?: number }
  // A note, "[1] …" in Craft, which markers like [^1] in the text link to.
  | { kind: 'note'; n: number; html: string }
  // A section break (Craft's divider).
  | { kind: 'break' }
  // A button that closes the post and asks Mallow `question`.
  | { kind: 'ask'; label: string; question: string }

// What kind of thing it is (Craft's "Category"), shown as a colored dot
// by its name on the desk.
export type DeskCategory = 'essay' | 'personal' | 'professional'

export type CaseStudyImage = {
  src: string
  alt: string
  aspectRatio?: number
}

export type CaseStudy = {
  // Craft collection item ID; the open counter is keyed by this.
  id: string
  slug: string
  label: string
  title: string
  intro?: string
  // A short summary of the post (Craft's "Summary"), shown with the details.
  summary?: string
  // Shown as is ("Jan 2020 – Present").
  date?: string
  // When the post went up, "YYYY-MM-DD" (Craft's "Published on"), for
  // search engines' structured data.
  publishedOn?: string
  link?: string
  disciplines: string[]
  category?: DeskCategory
  // `og`: the cover cropped as a 1200 × 630 JPEG for link previews.
  hero?: CaseStudyImage & { thumb: string; og?: string; caption?: string }
  tooltip?: { text: string }
  // Icon's top-left corner. Desktop: % of the desk. Mobile: x in %, y in svh.
  position?: { x?: number; y?: number; mobileX?: number; mobileY?: number }
  body: BodyNode[]
}
