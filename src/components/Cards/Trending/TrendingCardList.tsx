'use client'

import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useFetchNewTrendingCards } from '@/hooks/useCustomHooks'
import { cn } from '@/lib/utils/cn'
import { TTrendingCardMockData } from '@/mock/trendingCard'
import TrendingCard from './trending-card'
import { TrendingCardListSkeleton } from '@/components/skelton/TrendingCardListSkeleton'
import { getAllTribes } from '@/lib/supabase/tribes/tribe-table'
import ErrorPageDisplay from '@/components/error/error-page-display'
import { useAppSelector } from '@/hooks/reduxHooks'

export default function TrendingCardList({
  orientation,
  className,
}: {
  orientation?: string
  className?: string
}) {
  const router = useRouter()
  const { userId } = useAppSelector((state) => state.profile)
  const { data, error, isLoading } = useQuery({
    queryKey: ['tribes-trending-card'],
    queryFn: () => getAllTribes(),
  })
  if (isLoading) return <TrendingCardListSkeleton className="mt-0 h-full w-full pt-0" count={3} />

  if (error) <ErrorPageDisplay message="Tribes fetch failed" />

  if (!data?.length)
    return (
      <div className="flex justify-between rounded-lg border bg-muted p-3 text-sm">
        <p className="text-blue-400">Create new tribes to display content.</p>
        <div
          className="cursor-pointer border font-bold underline"
          onClick={() => router.push(`/protected/core/profile/${userId}`)}
        >
          Create
        </div>
      </div>
    )
  // const { data, fetchNextPage, hasNextPage } = useFetchNewTrendingCards({
  //   limit: 5,
  //   initialData,
  // })

  // const { ref, inView } = useInView({
  //   threshold: 0,
  //   rootMargin: '0px 0px',
  // })

  // useEffect(() => {
  //   if (inView) {
  //     fetchNextPage()
  //   }
  // }, [inView, fetchNextPage])

  return (
    <div
      className={cn(
        'scrollbar-w-2 scrollbar-thumb-rounded scrollbar-track-primary scrollbar-thumb mt-4 flex w-full gap-5',
        {
          'overflow-x-scroll': orientation === 'horizontal' || !orientation,
          'flex flex-wrap place-content-center place-items-center items-center justify-center overflow-y-scroll px-2 sm:px-4':
            orientation === 'vertical',
        },
        className
      )}
      key={'trending-card-list'}
    >
      {/* trending Card list */}
      {data?.map((item, i) => (
        <TrendingCard
          key={`trendingCardsWrapper-trendingCard-${i}-${item.id}`}
          className={orientation === 'vertical' ? 'max-w-[378px]' : 'first-line:'}
          authorName={item.author ?? ''}
          rank={Math.floor(Math.random()) * 200}
          totalMembers={item.subscribers ?? 20}
          tribeImage={item.tribe_cover_photo ?? ''}
          tribeName={item.tribe_name ?? ''}
          tribeProfilePic={item.tribe_photo ?? ''}
          id={item.id}
        />
      ))}
      {/* fetching new data */}
      {/* <div className="">
        {hasNextPage ? (
          <TrendingCardListSkeleton ref={ref} className="mt-0 h-full w-[250px] pt-0" />
        ) : null}
      </div> */}
    </div>
  )
}
