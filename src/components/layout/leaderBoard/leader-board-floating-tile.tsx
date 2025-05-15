import LeaderboardTile from '@/components/tiles/leader-board-tile'
import { TFetchLeaderBoardUserData } from '@/functions'
import { cn } from '@/lib/utils/cn'

export function LeaderBoardFloatingTile({
  userProfileData,
}: {
  userProfileData: TFetchLeaderBoardUserData
}) {
  return (
    <div className={cn('fixed bottom-[70px] left-0 right-0 z-10')}>
      <LeaderboardTile
        className="border-2 border-blue-400 shadow-xl"
        gems={userProfileData.gems}
        rank={userProfileData.rank}
        userName={userProfileData.userName}
        key={`${userProfileData.userName}-rank`}
      />
    </div>
  )
}
