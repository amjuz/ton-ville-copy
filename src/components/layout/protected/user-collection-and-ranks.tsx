'use client'

import HeroCollectionCard, { HeroCollectionScoreCard } from '@/components/Cards/HeroCollectionCard'
import GemBlue from '@/components/Icons/GemBlue'
import GemYellow from '@/components/Icons/GemYellow'
import TrophyGold from '@/components/Icons/TrophyGold'
import { UserCollectionScoreCardSkeleton } from '@/components/skelton/UserCollectionScoreCardSkeleton'

interface IUserCollectionAndRanks {
  userCollectionData: {
    gems: number
    rank: number
  }
  loading?: boolean
}
export default function UserCollectionAndRanks({
  userCollectionData: { gems, rank },
  loading,
}: IUserCollectionAndRanks) {
  return loading ? (
    <UserCollectionScoreCardSkeleton />
  ) : (
    <div className="">
      <div className="grid grid-cols-2 gap-4 px-2 py-12 md:flex md:max-w-xs md:flex-col">
        {/* Extract this into a wrapper and fetch the details and pass over. */}

        <HeroCollectionCard
          url="earn"
          SideIcon={<GemBlue />}
          title="Gems Collected"
          IconHolder={<HeroCollectionScoreCard Score={gems} IconHolder={<GemYellow />} />}
        />
        <HeroCollectionCard
          url="leaderboard"
          title="Your Rank"
          SideIcon={<TrophyGold />}
          IconHolder={
            <HeroCollectionScoreCard
              Score={rank}
              IconHolder={'#'}
              containerClassName="gap-0.5"
              IconClassname="w-auto h-auto text-2xl font-bold"
            />
          }
        />
      </div>
    </div>
  )
}
