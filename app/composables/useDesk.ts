import type { InjectionKey, Ref } from 'vue'

type Surface = Readonly<Ref<HTMLElement | null>>

type Desk = {
  surface: Surface
  raise: () => number
}

const deskKey: InjectionKey<Desk> = Symbol('desk')

export function provideDesk(surface: Surface) {
  let top = 0

  provide(deskKey, {
    surface,
    raise: () => ++top,
  })
}

export function useDesk() {
  const desk = inject(deskKey, null)
  if (!desk) {
    throw new Error('useDesk() needs a parent that called provideDesk()')
  }
  return desk
}
