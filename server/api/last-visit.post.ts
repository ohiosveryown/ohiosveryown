import { recordVisit, type LastVisit } from '../utils/last-visit'

export default defineEventHandler(async (event): Promise<LastVisit | null> => {
  return recordVisit(event)
})
