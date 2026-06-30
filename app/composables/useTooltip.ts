let dismissTooltipLabel: (() => void) | null = null

export function registerTooltipDismiss(fn: () => void) {
  dismissTooltipLabel = fn
}

export function unregisterTooltipDismiss(fn: () => void) {
  if (dismissTooltipLabel === fn) dismissTooltipLabel = null
}

export function dismissTooltip() {
  dismissTooltipLabel?.()
}
