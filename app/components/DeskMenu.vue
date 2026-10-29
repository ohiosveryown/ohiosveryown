<template>
  <AnimatePresence>
    <!-- Fades only: a transform here would make the menus inside position
         from it instead of the window, and an ancestor with one stops their
         backdrop blur from seeing the desk. -->
    <motion.div
      v-if="at"
      ref="layer"
      class="desk-menu-layer"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1, transition: { duration: 0.12 } }"
      :exit="{ opacity: 0, transition: { duration: 0.1 } }"
      @keydown="onKeydown"
    >
      <div
        ref="menu"
        class="desk-menu"
        role="menu"
        aria-label="Desktop"
        tabindex="-1"
        :style="{ left: `${at.x}px`, top: `${at.y}px` }"
        @pointerleave="unhighlight"
      >
        <template
          v-for="item in items"
          :key="item.label"
        >
          <hr
            v-if="item.divided"
            class="desk-menu__divider"
            role="separator"
          />
          <button
            class="desk-menu__item"
            :class="{
              'is-open': item.children && sub === item,
              'has-icon': item.icon,
            }"
            type="button"
            role="menuitem"
            :aria-haspopup="item.children ? 'menu' : undefined"
            :aria-expanded="item.children ? sub === item : undefined"
            @pointerenter="hover(item, $event)"
            @pointermove="move(item, $event)"
            @click="choose(item, $event)"
          >
            <span
              v-if="item.icon"
              class="desk-menu__icon"
              v-html="item.icon"
            />
            <span class="desk-menu__label">{{ item.label }}</span>
            <svg
              v-if="item.children"
              class="desk-menu__chevron"
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1l4 4-4 4"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </template>
      </div>

      <div
        v-if="sub?.children && subAt"
        ref="subMenu"
        class="desk-menu"
        role="menu"
        tabindex="-1"
        :aria-label="sub.label"
        @pointerleave="unhighlight"
        @pointerenter="cancelAim"
        :style="{ left: `${subAt.x}px`, top: `${subAt.y}px` }"
      >
        <button
          v-for="child in sub.children"
          :key="child.label"
          class="desk-menu__item"
          :class="{ 'has-image': child.image, 'has-dot': child.dot }"
          type="button"
          :role="child.checked ? 'menuitemradio' : 'menuitem'"
          :aria-checked="child.checked ? child.checked() : undefined"
          @pointerenter="highlight"
          @click="choose(child, $event)"
        >
          <img
            v-if="child.image"
            class="desk-menu__image"
            :src="child.image"
            alt=""
            width="32"
            height="24"
          />
          <span
            v-if="child.dot"
            class="desk-menu__dot"
            :style="{ background: child.dot }"
            aria-hidden="true"
          />
          <span class="desk-menu__label">{{ child.label }}</span>
          <svg
            v-if="child.checked?.()"
            class="desk-menu__check"
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 4.2l2.6 2.6L9 1.2"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  </AnimatePresence>
</template>

<style scoped lang="scss">
  // While it fades, its opacity makes it a layer of its own, stacked where
  // it sits in the page: under the desk items (which have z-indexes) unless
  // it has one too. Relative, not fixed, so it takes no room or clicks.
  .desk-menu-layer {
    position: relative;
    z-index: var(--zmax);
  }

  .desk-menu {
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: var(--zmax);
    padding: 0.5rem;
    min-width: 18rem;
    border: 0.5px solid rgba(255, 255, 255, 0.16);
    border-radius: 1.2rem;
    color: #fff;
    background: rgba(24, 24, 24, 0.72);
    box-shadow: 0 1.2rem 3.2rem rgba(0, 0, 0, 0.32);
    backdrop-filter: blur(2rem) saturate(1.6);
    -webkit-backdrop-filter: blur(2rem) saturate(1.6);

    &:focus {
      outline: none;
    }
  }

  .desk-menu__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2.4rem;
    padding: 0.7rem 1.2rem;
    border-radius: 0.7rem;
    color: inherit;
    background: none;
    font-family: var(--system-font);
    font-size: 1.4rem;
    font-weight: 500;
    letter-spacing: -0.014rem;
    line-height: 1.3;
    text-align: left;
    cursor: var(--cursor);

    // One highlight at a time: the pointer and the arrow keys both move
    // focus (see highlight), so focus is the highlight. An item whose
    // submenu is open stays lit.
    &:focus,
    &.is-open {
      background: rgba(255, 255, 255, 0.14);
      outline: none;
    }
  }

  // With an icon (the top level): the icon close to the edge, then the
  // label taking the room, then any chevron.
  .desk-menu__item.has-icon {
    gap: 0.8rem;
    padding-right: 0.8rem;
    padding-left: 0.8rem;
  }

  .desk-menu__icon {
    display: flex;
    flex-shrink: 0;
    width: 1.6rem;
    height: 1.6rem;

    :deep(svg) {
      display: block;
    }
  }

  .desk-menu__divider {
    margin: 0.5rem 1.2rem;
    height: 0;
    border: 0;
    border-top: 0.5px solid rgba(255, 255, 255, 0.16);
  }

  // With a picture (the wallpapers): the picture first, close to the
  // edge, then the label taking the room, then the check.
  .desk-menu__item.has-image {
    justify-content: flex-start;
    gap: 0.8rem;
    padding: 0.4rem 1.2rem 0.4rem 0.6rem;
  }

  .desk-menu__image {
    flex-shrink: 0;
    width: 3.2rem;
    height: 2.4rem;
    border-radius: 0.4rem;
    object-fit: cover;
  }

  // With a dot (the labels' key): the dot, then the label.
  .desk-menu__item.has-dot {
    justify-content: flex-start;
    gap: 0.8rem;
    padding-left: 0.8rem;
  }

  .desk-menu__dot {
    flex-shrink: 0;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
  }

  .desk-menu__label {
    flex: 1 0 0;
    min-width: 0;
  }

  .desk-menu__check {
    flex-shrink: 0;
  }

  // Room before it, past the row's gap (icon rows' gap is small).
  .desk-menu__chevron {
    flex-shrink: 0;
    margin-left: 1.6rem;
    opacity: 0.6;
  }
</style>

<script setup lang="ts">
  import { AnimatePresence, motion } from 'motion-v'
  import { DESK_CATEGORIES } from '~/data/deskCategories'
  import cleanUpIcon from '~/assets/icons/menu/clean-up.svg?raw'
  import labelsIcon from '~/assets/icons/menu/labels.svg?raw'
  import mallowIcon from '~/assets/icons/menu/mallow.svg?raw'
  import sortByIcon from '~/assets/icons/menu/sort-by.svg?raw'
  import wallpaperIcon from '~/assets/icons/menu/wallpaper.svg?raw'

  // AnimatePresence renders no element of its own to pass attributes to.
  defineOptions({ inheritAttrs: false })

  const props = defineProps<{
    // Off while something covers the desk (an open case study).
    disabled?: boolean
  }>()

  const { surface, cleanUp, restore, spotlight } = useDesk()
  const { focus: focusMallow } = useAskDrop()
  const {
    wallpapers,
    current: currentWallpaper,
    choose: chooseWallpaper,
  } = useWallpaper()

  // An item runs something, or opens a submenu of its own. `divided` puts a
  // rule above it.
  type Item = {
    label: string
    run?: () => void
    children?: Item[]
    divided?: boolean
    // For a choice among several (a wallpaper): whether it's the current one.
    checked?: () => boolean
    // A picture beside the label (a wallpaper's).
    image?: string
    // A colored dot before it (a desk label's).
    dot?: string
    // An icon before it (the top level's), as SVG markup.
    icon?: string
  }
  const items: Item[] = [
    { label: 'Clean Up', icon: cleanUpIcon, run: () => cleanUp() },
    {
      label: 'Sort By',
      icon: sortByIcon,
      children: [
        { label: 'Date', run: () => cleanUp('date') },
        { label: 'Most Opened', run: () => cleanUp('opens') },
        { label: 'Name', run: () => cleanUp('name') },
        { label: 'Label', run: () => cleanUp('category') },
        // Always last: everything back where Craft put it.
        { label: 'Sicko Mode', run: restore },
      ],
    },
    {
      label: 'Change Wallpaper',
      icon: wallpaperIcon,
      children: wallpapers.map((wallpaper) => ({
        label: wallpaper.name,
        image: `/field/${wallpaper.id}-thumb.webp`,
        run: () => chooseWallpaper(wallpaper.id),
        checked: () => currentWallpaper.value.id === wallpaper.id,
      })),
    },
    // The key to the dots by the items' names. Picking one picks out its
    // items for a moment.
    {
      label: 'Labels',
      icon: labelsIcon,
      children: DESK_CATEGORIES.map((category) => ({
        label: category.name,
        dot: category.color,
        run: () => spotlight(category.id),
      })),
    },
    {
      label: 'Ask Mallow…',
      icon: mallowIcon,
      run: focusMallow,
      divided: true,
    },
  ]

  // Where it's open (viewport px), or null when closed; likewise the open
  // submenu and where it sits.
  const at = ref<{ x: number; y: number } | null>(null)
  const sub = shallowRef<Item | null>(null)
  const subAt = ref<{ x: number; y: number } | null>(null)
  const layer = useTemplateRef<{ $el: HTMLElement }>('layer')
  const menu = useTemplateRef<HTMLElement>('menu')
  const subMenu = useTemplateRef<HTMLElement>('subMenu')

  // Only on the bare desk: text, links, icons and the chat keep the
  // browser's own menu, and so does a Shift right-click anywhere.
  const NATIVE =
    'a, button, input, textarea, p, span, h1, h2, h3, svg, img, video, [contenteditable], .desk-item, .home__ask'

  // Kept this far in from the window's edges.
  const EDGE = 8

  // A mouse and room for the desk (md up); phones have no right-click.
  let wide: MediaQueryList | undefined

  async function onContextMenu(event: MouseEvent) {
    const target = event.target as Element | null
    if (
      props.disabled ||
      event.shiftKey ||
      !wide?.matches ||
      !target ||
      target.closest(NATIVE)
    ) {
      return
    }
    event.preventDefault()
    dismissTooltip()
    closeSub()
    at.value = { x: event.clientX, y: event.clientY }
    await nextTick()
    const el = menu.value
    if (!el) return
    // Kept on screen: flips left or up at the edges, like the system menu.
    const { width, height } = el.getBoundingClientRect()
    at.value = {
      x:
        event.clientX + width + EDGE > window.innerWidth
          ? Math.max(EDGE, event.clientX - width)
          : event.clientX,
      y:
        event.clientY + height + EDGE > window.innerHeight
          ? Math.max(EDGE, event.clientY - height)
          : event.clientY,
    }
    // Nothing lit until the pointer or an arrow key picks an item, but
    // focused, so the keys work straight away.
    el.focus({ preventScroll: true })
  }

  function close() {
    at.value = null
    closeSub()
  }

  function closeSub() {
    cancelAim()
    aimFrom = null
    sub.value = null
    subAt.value = null
  }

  // Beside its item, its first item level with it; on the left when
  // there's no room on the right.
  async function openSub(item: Item, from: HTMLElement) {
    if (sub.value === item) return
    sub.value = item
    subAt.value = { x: -9999, y: -9999 }
    await nextTick()
    const el = subMenu.value
    const parent = menu.value
    if (!el || !parent || sub.value !== item) return
    const row = from.getBoundingClientRect()
    const box = parent.getBoundingClientRect()
    const { width, height } = el.getBoundingClientRect()
    const inset = (el.firstElementChild as HTMLElement).offsetTop
    const right = box.right + 2
    subAt.value = {
      x:
        right + width + EDGE > window.innerWidth
          ? Math.max(EDGE, box.left - width - 2)
          : right,
      y: Math.max(
        EDGE,
        Math.min(row.top - inset, window.innerHeight - height - EDGE),
      ),
    }
  }

  // Pointing at an item lights it; one with a submenu opens it, any
  // other closes it. Except on the way to an open submenu: a pointer
  // heading for it diagonally crosses the items below (or above) its own,
  // and switching to them would snatch the submenu away. So while the
  // pointer is inside the triangle from where it last was on the open
  // item to the submenu's near edge, the switch waits; it happens if the
  // pointer leaves the triangle, or stays put for AIM_MS.
  const AIM_MS = 300
  let aimFrom: { x: number; y: number } | null = null
  let aimTimer: ReturnType<typeof setTimeout> | undefined
  let waiting: Item | null = null

  function hover(item: Item, event: PointerEvent) {
    const row = event.currentTarget as HTMLElement
    if (sub.value && item !== sub.value && aiming(event)) {
      waiting = item
      clearTimeout(aimTimer)
      aimTimer = setTimeout(() => apply(item, row), AIM_MS)
      return
    }
    apply(item, row)
  }

  function move(item: Item, event: PointerEvent) {
    const point = { x: event.clientX, y: event.clientY }
    if (item === sub.value) aimFrom = point
    else if (waiting === item && !aiming(event)) {
      apply(item, event.currentTarget as HTMLElement)
    }
  }

  function apply(item: Item, row: HTMLElement) {
    cancelAim()
    row.focus({ preventScroll: true })
    if (item.children) openSub(item, row)
    else closeSub()
  }

  function cancelAim() {
    clearTimeout(aimTimer)
    waiting = null
  }

  // Inside the triangle from aimFrom to the submenu's near corners (with a
  // little slack above and below)?
  function aiming(event: PointerEvent) {
    const el = subMenu.value
    const parent = menu.value
    if (!el || !parent || !aimFrom) return false
    const box = el.getBoundingClientRect()
    const onRight = box.left >= parent.getBoundingClientRect().left
    const edge = onRight ? box.left : box.right
    const slack = 12
    const a = aimFrom
    const b = { x: edge, y: box.top - slack }
    const c = { x: edge, y: box.bottom + slack }
    const p = { x: event.clientX, y: event.clientY }
    const side = (
      u: { x: number; y: number },
      v: { x: number; y: number },
      w: { x: number; y: number },
    ) => (v.x - u.x) * (w.y - u.y) - (v.y - u.y) * (w.x - u.x)
    const d1 = side(a, b, p)
    const d2 = side(b, c, p)
    const d3 = side(c, a, p)
    const negative = d1 < 0 || d2 < 0 || d3 < 0
    const positive = d1 > 0 || d2 > 0 || d3 > 0
    return !(negative && positive)
  }

  function highlight(event: PointerEvent) {
    const row = event.currentTarget as HTMLElement
    row.focus({ preventScroll: true })
    return row
  }

  // Off an item and out of its menu: nothing lit (the menu keeps focus for
  // the keys), except an open submenu's item.
  function unhighlight(event: PointerEvent) {
    const list = event.currentTarget as HTMLElement
    if (list.contains(document.activeElement)) {
      list.focus({ preventScroll: true })
    }
  }

  async function choose(item: Item, event: MouseEvent) {
    if (item.children) {
      await openSub(item, event.currentTarget as HTMLElement)
      // From the keyboard (Enter or Space), into it.
      if (event.detail === 0 && subMenu.value) focusFirst(subMenu.value)
      return
    }
    close()
    item.run?.()
  }

  function focusFirst(el: HTMLElement) {
    el.querySelector<HTMLElement>('[role="menuitem"]')?.focus()
  }

  // Up and down move between a menu's items, wrapping; right opens a
  // submenu and left goes back out of one; Escape and Tab close it all.
  async function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Tab') {
      event.preventDefault()
      close()
      return
    }
    const current = document.activeElement as HTMLElement | null
    const list = current?.closest<HTMLElement>('[role="menu"]')
    if (!current || !list) return
    const inSub = list === subMenu.value

    const buttons = [...list.querySelectorAll<HTMLElement>('[role="menuitem"]')]
    const index = buttons.indexOf(current)

    if (event.key === 'ArrowRight' && !inSub) {
      const item = items[index]
      if (!item?.children) return
      event.preventDefault()
      await openSub(item, current)
      if (subMenu.value) focusFirst(subMenu.value)
      return
    }
    if (event.key === 'ArrowLeft' && inSub) {
      event.preventDefault()
      const parent = menu.value?.querySelector<HTMLElement>('.is-open')
      closeSub()
      parent?.focus()
      return
    }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const down = event.key === 'ArrowDown'
    // From nothing lit, down starts at the top and up at the bottom.
    const next =
      index < 0
        ? down
          ? 0
          : buttons.length - 1
        : (index + (down ? 1 : -1) + buttons.length) % buttons.length
    buttons[next]?.focus()
  }

  // Any press outside it, a scroll, a resize or leaving the window closes it.
  function onPointerDown(event: PointerEvent) {
    if (!at.value) return
    if (layer.value?.$el.contains(event.target as Node)) return
    close()
  }

  watch(
    () => props.disabled,
    (disabled) => {
      if (disabled) close()
    },
  )

  onMounted(() => {
    wide = window.matchMedia('(min-width: 700px) and (pointer: fine)')
    surface.value?.addEventListener('contextmenu', onContextMenu)
    surface.value?.addEventListener('scroll', close, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { capture: true })
    window.addEventListener('resize', close)
    window.addEventListener('blur', close)
  })

  onBeforeUnmount(() => {
    surface.value?.removeEventListener('contextmenu', onContextMenu)
    surface.value?.removeEventListener('scroll', close)
    window.removeEventListener('pointerdown', onPointerDown, { capture: true })
    window.removeEventListener('resize', close)
    window.removeEventListener('blur', close)
  })
</script>
