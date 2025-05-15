import LeaderBoardList from './leader-board-list'
import { fetchLeaderBoardData, TFetchLeaderBoardData } from '@/functions'

export default async function LeaderboardCardsWrappers() {
  const initialData: TFetchLeaderBoardData = await fetchLeaderBoardData({ limit: 15 })
  return (
    <div className="scrollbar-w-2 scrollbar-thumb-rounded scrollbar-track-primary scrollbar-thumb mb-5 mt-4 flex w-full flex-col gap-5 overflow-x-scroll">
      <LeaderBoardList initialData={initialData} />
    </div>
  )
}
