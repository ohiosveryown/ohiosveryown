// The only shapes the client receives; Craft's raw blocks stay on the server.
export type BodyNode =
  | { kind: 'h3' | 'h4' | 'p' | 'quote' | 'caption'; html: string }
  | { kind: 'img'; src: string; alt: string; aspectRatio?: number }
  | { kind: 'video'; src: string; aspectRatio?: number }
  // A note, "[1] …" in Craft, which markers like [^1] in the text link to.
  | { kind: 'note'; n: number; html: string }
  // A section break (Craft's divider).
  | { kind: 'break' }

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
  date?: string
  link?: string
  disciplines: string[]
  hero?: CaseStudyImage & { thumb: string; caption?: string }
  tooltip?: { text: string }
  // Icon's top-left corner. Desktop: % of the desk. Mobile: x in %, y in svh.
  position?: { x?: number; y?: number; mobileX?: number; mobileY?: number }
  body: BodyNode[]
}
