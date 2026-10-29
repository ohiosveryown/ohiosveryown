import type { DeskCategory } from '#shared/types/case-study'

// The desk's labels, in the order Sort By › Label puts them: a colored dot
// by each item's name, and the key in the right-click menu's Labels.
// `one`: what a single item is, said by its dot's tooltip.
export const DESK_CATEGORIES: {
  id: DeskCategory
  name: string
  one: string
  color: string
}[] = [
  { id: 'essay', name: 'Essays', one: 'An essay', color: '#e76a5e' },
  {
    id: 'personal',
    name: 'Personal Projects',
    one: 'A personal project',
    color: '#7dcc71',
  },
  {
    id: 'professional',
    name: 'Professional Projects',
    one: 'A professional project',
    color: '#a972ce',
  },
]

export function deskCategory(id: DeskCategory | undefined) {
  return DESK_CATEGORIES.find((category) => category.id === id)
}
