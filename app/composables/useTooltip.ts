let dismissTooltipLabel: (() => void) | null = null
let suppressed = false

export function registerTooltipDismiss(fn: () => void) {
  dismissTooltipLabel = fn
}

export function unregisterTooltipDismiss(fn: () => void) {
  if (dismissTooltipLabel === fn) dismissTooltipLabel = null
}

export function dismissTooltip() {
  dismissTooltipLabel?.()
}

export function suppressTooltip(value: boolean) {
  suppressed = value
  if (value) dismissTooltip()
}

export function isTooltipSuppressed() {
  return suppressed
}
