// The only shapes the client receives; Craft's raw blocks stay on the server.
export type BodyNode =
  | { kind: 'h3' | 'h4' | 'p'; html: string }
  | { kind: 'img'; src: string; alt: string; aspectRatio?: number }

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
  hero?: CaseStudyImage & { thumb: string }
  tooltip?: { text: string }
  // Icon's top-left corner. Desktop: % of the desk. Mobile: x in %, y in svh.
  position?: { x?: number; y?: number; mobileX?: number; mobileY?: number }
  body: BodyNode[]
}
