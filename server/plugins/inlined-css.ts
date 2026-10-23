// Every stylesheet is inlined into the page (features.inlineStyles in
// nuxt.config.ts), but Nuxt still links the CSS of components shared between
// pages (LittleGuy, on the home and lab pages) as well: an extra request the
// first paint waits on, for styles it already has. Drop those links. Only
// safe while everything is inlined; remove this if inlining is turned off.
const STYLESHEET =
  /<link\s[^>]*rel="stylesheet"[^>]*href="\/_nuxt\/[^"]+\.css"[^>]*>/g

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    if (!html.head.some((part) => part.includes('<style'))) return
    html.head = html.head.map((part) => part.replace(STYLESHEET, ''))
  })
})
