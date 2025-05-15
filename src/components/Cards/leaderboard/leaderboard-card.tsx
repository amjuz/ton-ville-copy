import Avatar from '@/components/Elements/avatar'
import { FormatNumber, TruncateText } from '@test/utils/utils'

interface ILeaderboardCard {
  userName: string
  rank: number
  gems: number
}

export default function LeaderboardCard({ gems, rank, userName }: ILeaderboardCard) {
  const formattedGems = FormatNumber(gems)
  const formattedRank = FormatNumber(rank)
  const formattedName = TruncateText(userName, 20)
  return (
    <div className="flex w-full items-center gap-2">
      {/* @TODO Add in src according to the users. */}
      <Avatar AvtImageClassName="w-12 h-12" />
      <div className="flex w-full items-center justify-between">
        <div>
          <div className="flex w-fit items-center rounded-2xl bg-secondary px-2.5 py-1 text-center text-xs font-medium">
            <p className="-mb-0.5 text-muted-foreground">#{formattedRank}</p>
          </div>
          <h4 className="font-medium">{formattedName}</h4>
        </div>
        <div className="text-sm font-medium text-secondary-foreground">
          <p>{formattedGems}</p>
        </div>
      </div>
    </div>
  )
}
