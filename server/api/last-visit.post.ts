import { recordVisit, type LastVisit } from '../utils/last-visit'

export default defineEventHandler(async (event): Promise<LastVisit | null> => {
  try {
    return await recordVisit(event)
  } catch (err) {
    console.error('[last-visit] record failed', err)
    return null
  }
})
