import { Suspense } from 'react'
import MiniCardsWrapper from '@/components/Cards/events/HotEvents/mini-cards-wrapper'
import LeaderboardCardsWrappers from '@/components/Cards/leaderboard/leaderboard-cards-wrappers'
import QuestsWrapperCards from '@/components/Cards/Quests/quests-wrapper-cards'
import TrendingCardsWrapper from '@/components/Cards/Trending/trending-cards-wrapper'
import UserCollectionAndRanksWrapper from '@/components/layout/protected/user-collection-and-ranks-wapper'
import MiniCardSkelton from '@/components/skelton/MiniCardSkelton'
import { TrendingCardListSkeleton } from '@/components/skelton/TrendingCardListSkeleton'
import { UserCollectionScoreCardSkeleton } from '@/components/skelton/UserCollectionScoreCardSkeleton'
import TitleLinkCombo from '@/components/titles/title-link-combo'
import QuestCardSkelton from '@/components/skelton/QuestCardSkelton'
import LeaderBoardSkelton from '@/components/skelton/LeaderBoardSkelton'

export default function CorePage() {
  return (
    <main className="px-2 sm:px-4">
      <section>
        <Suspense fallback={<UserCollectionScoreCardSkeleton />}>
          <UserCollectionAndRanksWrapper />
        </Suspense>
      </section>
      {/* Header Titles should be in main page, so that its easier to navigate don't nest it. */}
      <TitleLinkCombo
        href="/protected/core/search?type=Tribes"
        title="Trending Tribes"
        emoji={`✨`}
      />
      {/* Create separate components for nested item, which nest the items. */}
      <Suspense fallback={<TrendingCardListSkeleton count={5} />}>
        <TrendingCardsWrapper />
      </Suspense>
      {/* Hot events */}
      <TitleLinkCombo href="/protected/core/search?type=Events" title="Hot Events" emoji={`🔥`} />
      <Suspense fallback={<MiniCardSkelton count={8} />}>
        <MiniCardsWrapper />
      </Suspense>
      <TitleLinkCombo href="/protected/core/search?type=Quests" title="Top Quests" emoji={`🎡`} />
      <Suspense fallback={<QuestCardSkelton count={4} />}>
        <QuestsWrapperCards />
      </Suspense>
      {/* Leaderboard */}
      <TitleLinkCombo href="/protected/core/leaderboard" title="Leaderboard" emoji={`🏆`} />
      <Suspense fallback={<LeaderBoardSkelton />}>
        <LeaderboardCardsWrappers />
      </Suspense>
    </main>
  )
}
