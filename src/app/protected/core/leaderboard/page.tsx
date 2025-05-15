import { Suspense } from 'react'
import LeaderBoardPageWrapper from '@/components/layout/leaderBoard/leader-board-page'
import { LeaderBoardPageSkelton } from '@/components/skelton/leader-board-page-skelton'

export default function LeaderboardPage({}) {
  return (
    <main>
      {/* need to refactor fallback */}
      <Suspense fallback={<LeaderBoardPageSkelton count={12} />}>
        <LeaderBoardPageWrapper />
      </Suspense>
    </main>
  )
}
