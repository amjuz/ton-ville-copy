'use client'

import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { TFetchMiniCardData } from '@/functions'
import { useFetchMiniCardMockData } from '@/hooks/useCustomHooks'
import MiniCard from './mini-card'
import { MiniCardInfiniteQuerySkelton } from '@/components/skelton/MiniCardSkelton'

interface IMiniCardList {
  initialData: TFetchMiniCardData
}

export default function MiniCardList({ initialData }: IMiniCardList) {
  const { data, fetchNextPage, hasNextPage } = useFetchMiniCardMockData({
    initialData,
    limit: 16,
  })

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '0px 250px',
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])
  return (
    <div className="scrollbar-w-2 scrollbar-thumb-rounded scrollbar-track-primary scrollbar-thumb mb-6 mt-4 grid grid-flow-col grid-rows-2 gap-4 overflow-x-scroll">
      {data.pages.map(({ MiniCardData }) =>
        MiniCardData.map((item, i) => (
          <MiniCard
            key={`Minicard-item-${i}-${item.title}`}
            date={item.date}
            imageAlt={item.imageAlt}
            imageUrl={item.imageUrl}
            place={item.place}
            title={item.title}
            userName={item.userName}
          />
        ))
      )}
      {hasNextPage ? <MiniCardInfiniteQuerySkelton ref={ref} count={2} /> : null}
    </div>
  )
}
