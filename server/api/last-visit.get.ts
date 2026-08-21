import { peekLastVisit, type LastVisit } from '../utils/last-visit'

export type { LastVisit }

export default defineEventHandler(async (event): Promise<LastVisit | null> => {
  return peekLastVisit(event)
})
