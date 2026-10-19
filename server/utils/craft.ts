// Craft's API connection (Imagine tab → Add API connection). Server-only:
// the connection URL alone grants access, so it never reaches the client.
// Rate limits: 100 requests / 60 s per space, 50 / 10 s per IP.

export type CraftBlock = {
  id: string
  type: string
  title?: string
  textStyle?: string
  listStyle?: string
  markdown?: string
  url?: string
  altText?: string
  aspectRatio?: number
  content?: CraftBlock[]
}

export type CraftItem = {
  id: string
  title: string
  properties: Record<string, unknown>
  content?: CraftBlock[]
}

export async function getCraftItems(): Promise<CraftItem[]> {
  const { craftApiUrl, craftApiKey, craftCollectionId } = useRuntimeConfig()
  if (!craftApiUrl || !craftCollectionId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Craft is not configured',
    })
  }

  const { items } = await $fetch<{ items: CraftItem[] }>(
    `/collections/${craftCollectionId}/items`,
    {
      baseURL: craftApiUrl,
      query: { maxDepth: -1 },
      headers: craftApiKey
        ? { Authorization: `Bearer ${craftApiKey}` }
        : undefined,
    },
  )
  return items
}
