import blush from '~/assets/desk/blush.webp'

export type DeskDetail = {
  label: string
  value: string
  href?: string
}

export type DeskEntry = {
  id: string
  name: string
  image: string
  title: string
  details: DeskDetail[]
  figure?: { src: string; alt: string }
  heading?: string
  body: string[]
}

export const kioskEntry: DeskEntry = {
  id: 'sq-kiosk',
  name: 'sq-kiosk.design',
  image: blush,
  title: 'Designing a modern, variable typeface inspired by space',
  details: [
    { label: 'Date', value: 'May 2022 – Present' },
    {
      label: 'Link',
      value: 'blush.ohiosveryown.co',
      href: 'https://blush.ohiosveryown.co',
    },
    { label: 'Discipline(s)', value: 'Typeface design' },
  ],
  figure: { src: blush, alt: 'The word Blush set over a field of grass' },
  heading: 'It’s called Blush. And it’s dynamic.',
  body: [
    'Square unveiled Square Kiosk, the company’s new flagship, intelligent self-service kiosk. Combining AI-powered software, voice capabilities, and a large touch display with premium hardware, Square Kiosk gives customers an experience that feels less like self-ordering and more like service – while helping QSR operators better manage peak-rush pressure, labor constraints, and growing demand for faster, more personalized hospitality.',
    'Alongside new hardware, Square is also rolling out new capabilities that make it easier for large QSR franchises to manage operations across their entire network of locations.',
  ],
}
