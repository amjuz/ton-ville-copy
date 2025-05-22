'use client'

import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useQuery } from '@tanstack/react-query'
import { TFetchMiniCardData } from '@/functions'
import { useFetchMiniCardMockData } from '@/hooks/useCustomHooks'
import MiniCard from './mini-card'
import { MiniCardInfiniteQuerySkelton } from '@/components/skelton/MiniCardSkelton'
import { getAllEvent, TAllEvents } from '@/lib/supabase/events/events-table'
import ErrorPageDisplay from '@/components/error/error-page-display'

interface IMiniCardList {
  initialData: TFetchMiniCardData
}

export default function MiniCardList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['events-trending-card'],
    queryFn: () => getAllEvent(),
  })
  if (isLoading) return <MiniCardInfiniteQuerySkelton count={3} />

  if (error) <ErrorPageDisplay message="Events fetch failed" />

  // const { data, fetchNextPage, hasNextPage } = useFetchMiniCardMockData({
  //   initialData,
  //   limit: 16,
  // })

  // const { ref, inView } = useInView({
  //   threshold: 0,
  //   rootMargin: '0px 250px',
  // })

  // useEffect(() => {
  //   if (inView) {
  //     fetchNextPage()
  //   }
  // }, [inView, fetchNextPage])
  return (
    <div className="scrollbar-w-2 scrollbar-thumb-rounded scrollbar-track-primary scrollbar-thumb mb-6 mt-4 grid grid-flow-col grid-rows-2 gap-4 overflow-x-scroll">
      {data?.map((item, i) => (
        <MiniCard
          key={`events-item-${i}-${item.title}`}
          date={item.date ?? ''}
          imageAlt={''}
          imageUrl={item.eventPhoto ?? ''}
          place={item.location ?? ''}
          title={item.title ?? ''}
          userName={item.author ?? ''}
          eventId={item.id}
          tribeId={item.tribeId}
        />
      ))}
      {/* {hasNextPage ? <MiniCardInfiniteQuerySkelton ref={ref} count={2} /> : null} */}
    </div>
  )
}
