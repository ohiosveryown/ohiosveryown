let dismissTooltipLabel: (() => void) | null = null
let showTooltipLabel: ((target: HTMLElement) => void) | null = null
let suppressed = false

export function registerTooltipDismiss(fn: () => void) {
  dismissTooltipLabel = fn
}

export function unregisterTooltipDismiss(fn: () => void) {
  if (dismissTooltipLabel === fn) dismissTooltipLabel = null
}

export function registerTooltipShow(fn: (target: HTMLElement) => void) {
  showTooltipLabel = fn
}

export function unregisterTooltipShow(fn: (target: HTMLElement) => void) {
  if (showTooltipLabel === fn) showTooltipLabel = null
}

export function dismissTooltip() {
  dismissTooltipLabel?.()
}

// For when a tooltip's content changes while the cursor is already over it,
// so no new mouseover will arrive.
export function showTooltip(target: HTMLElement) {
  showTooltipLabel?.(target)
}

export function suppressTooltip(value: boolean) {
  suppressed = value
  if (value) dismissTooltip()
}

export function isTooltipSuppressed() {
  return suppressed
}
