import { TgetGroupEventsQuestCountParams } from '@/types/app/tribes'

export const getGroupEventsQuestCount = ({
  eventCount,
  questCount,
  tgGroupCount,
}: TgetGroupEventsQuestCountParams) => {
  return `${tgGroupCount} Groups | ${eventCount} Events | ${questCount} Quest `
}
