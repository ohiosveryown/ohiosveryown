import type { CaseStudy } from '#shared/types/case-study'

// Structured data (JSON-LD) for search engines: who Matt is, the site, and
// each post. Things refer to each other by `@id`, so every post's author is
// the one Person below rather than a copy of him.

export const SITE_URL = 'https://ohiosveryown.co'
const PERSON_ID = `${SITE_URL}/#matt`
const WEBSITE_ID = `${SITE_URL}/#website`
const STUDIO_ID = 'https://proportional.design/#studio'

// Matt, the site and his furniture studio. On every page (pages/index.vue).
export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: 'ohiosveryown',
        inLanguage: 'en',
        publisher: { '@id': PERSON_ID },
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Matthew Pence',
        alternateName: 'Matt Pence',
        url: `${SITE_URL}/`,
        jobTitle: 'Principal Product Designer',
        worksFor: { '@type': 'Organization', name: 'Square' },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Atlanta',
          addressRegion: 'GA',
          addressCountry: 'US',
        },
        sameAs: [
          'https://www.linkedin.com/in/mpence20',
          'https://x.com/cmykw_',
        ],
      },
      {
        '@type': 'Organization',
        '@id': STUDIO_ID,
        name: 'Proportional Design',
        url: 'https://proportional.design',
        description: 'A small furniture studio in Atlanta, Georgia.',
        founder: { '@id': PERSON_ID },
        sameAs: ['https://www.instagram.com/proportional.design'],
      },
    ],
  }
}

// One post (pages/index/work/[slug].vue): the article and where it sits.
export function postGraph(study: CaseStudy, fallbackImage: string) {
  const url = `${SITE_URL}/work/${study.slug}`
  const description = study.intro ?? study.tooltip?.text
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#post`,
        url,
        mainEntityOfPage: url,
        headline: study.title,
        ...(description && { description }),
        image: study.hero?.og ?? fallbackImage,
        ...(study.publishedOn && { datePublished: study.publishedOn }),
        ...(study.disciplines.length && { keywords: study.disciplines }),
        inLanguage: 'en',
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        isPartOf: { '@id': WEBSITE_ID },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'ohiosveryown',
            item: `${SITE_URL}/`,
          },
          { '@type': 'ListItem', position: 2, name: study.title, item: url },
        ],
      },
    ],
  }
}

// As a <script type="application/ld+json">. "<" is escaped so text from
// Craft can't close the tag.
export function jsonLd(data: object, key: string) {
  return {
    key,
    type: 'application/ld+json',
    innerHTML: JSON.stringify(data).replace(/</g, '\\u003c'),
  }
}
