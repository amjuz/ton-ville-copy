'use client'

import React, { useEffect } from 'react'
import { TFetchLeaderBoardData } from '@/functions'
import LeaderboardCard from './leaderboard-card'

interface ILeaderBoardList {
  initialData: TFetchLeaderBoardData
}
export default function LeaderBoardList({ initialData }: ILeaderBoardList) {
  // const { data, fetchNextPage, hasNextPage } = useLeaderBoardData({ initialData, limit: 10 })
  // const { ref, inView } = useInView({
  //   rootMargin: '0px 0px',
  // })
  // useEffect(() => {
  //   fetchNextPage()
  // }, [inView, fetchNextPage])
  return (
    <React.Fragment>
      {
        // data.pages.map((items) =>
        initialData.mockData.map((item, i) => (
          <LeaderboardCard
            gems={item.gems}
            rank={item.rank}
            userName={item.userName}
            key={`leader-board-user-${i}-${item.userName}`}
          />
        ))
        // )
      }
      {/* {hasNextPage ? <LeaderboardInfinityQuery ref={ref} /> : null} */}
    </React.Fragment>
  )
}
