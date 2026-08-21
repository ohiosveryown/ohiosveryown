import { peekLastVisit, type LastVisit } from '../utils/last-visit'

export type { LastVisit }

export default defineEventHandler(async (event): Promise<LastVisit | null> => {
  try {
    return await peekLastVisit(event)
  } catch (err) {
    console.error('[last-visit] peek failed', err)
    return null
  }
})
