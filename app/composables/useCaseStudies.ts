import type { CaseStudy } from '#shared/types/case-study'

// One shared key, so the home page and /work/[slug] reuse the same payload.
export function useCaseStudies() {
  return useFetch<CaseStudy[]>('/api/case-studies', {
    key: 'case-studies',
    default: () => [],
  })
}
