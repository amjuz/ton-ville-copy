'use client'

import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import PodiumCard from '@/components/Cards/leaderboard/leader-board-podium-card'
import LeaderboardTile from '@/components/tiles/leader-board-tile'
import { TFetchLeaderBoardData, TFetchLeaderBoardUserData } from '@/functions'
import { useLeaderBoardData } from '@/hooks/useCustomHooks'
import { LeaderBoardFloatingTile } from './leader-board-floating-tile'
import { LeaderBoardPageSkelton } from '@/components/skelton/leader-board-page-skelton'

interface ILeaderBoardPageList {
  initialData: TFetchLeaderBoardData
  userProfileData: TFetchLeaderBoardUserData
}
export default function LeaderBoardPageList({
  initialData,
  userProfileData,
}: ILeaderBoardPageList) {
  const { data, hasNextPage, fetchNextPage } = useLeaderBoardData({ initialData, limit: 20 })
  const podiumUsers = data.pages[0].mockData.filter((fv) => fv.rank < 4)
  const { ref: fetchRef, inView: fetchNext } = useInView({
    rootMargin: '0px 0px 0px 0px',
  })

  const { ref: floatingRef, inView } = useInView({
    rootMargin: '0px 0px -140px 0px',
  })

  useEffect(() => {
    fetchNextPage()
  }, [fetchNext, fetchNextPage])

  return (
    <main className="pt-20">
      {/* podium card */}
      <PodiumCard podiumUsers={podiumUsers} />
      <div className="mt-4 flex flex-col gap-2">
        {data.pages.map((pages) =>
          pages.mockData.map((item) => {
            if (item.id < 3) return null
            const floatingTileRank = userProfileData.rank
            // leader board list
            return (
              <LeaderboardTile
                key={`leader-board-page-${item.id}`}
                gems={item.gems}
                rank={item.rank}
                userName={item.userName}
                ref={item.rank === floatingTileRank ? floatingRef : null}
                className={item.rank === floatingTileRank ? 'border-2 border-blue-400' : ''}
              />
            )
          })
        )}
      </div>
      {/* skelton */}
      {hasNextPage ? <LeaderBoardPageSkelton count={2} ref={fetchRef} /> : null}
      {/* floating card */}
      {!inView && <LeaderBoardFloatingTile userProfileData={userProfileData} />}
    </main>
  )
}
