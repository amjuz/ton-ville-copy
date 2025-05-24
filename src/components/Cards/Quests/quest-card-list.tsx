'use client'

import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { TFetchQuestCards } from '@/functions'
import { useQuestInfinityQuery } from '@/hooks/useCustomHooks'
import { cn } from '@/lib/utils/cn'
import QuestCard from './quest-card'
import QuestCardSkelton, {
  QuestCardInfiniteQuerySkelton,
} from '@/components/skelton/QuestCardSkelton'
import QuestCardOld from './quest-card-old'
import { getAllQuest } from '@/lib/supabase/quests/quests-table'
import ErrorPageDisplay from '@/components/error/error-page-display'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/hooks/reduxHooks'

interface IQuestCardList {
  initialData: TFetchQuestCards
}
export default function QuestCardList() {
  const router = useRouter()
    const { userId } = useAppSelector((state) => state.profile)
  
  const { data, error, isLoading } = useQuery({
    queryKey: ['quest-trending-card'],
    queryFn: () => getAllQuest(),
  })
  if (isLoading) return <QuestCardSkelton count={3} />

  if (error) <ErrorPageDisplay message="Quests fetch failed" />

  if (!data?.length) {
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
  }
  // const { data, fetchNextPage, hasNextPage } = useQuestInfinityQuery({
  //   initialData,
  //   limit: 8,
  // })

  // const { inView, ref } = useInView({
  //   rootMargin: '0px 0px',
  // })

  // useEffect(() => {
  //   fetchNextPage()
  // }, [inView, fetchNextPage])
  return (
    <div
      className={cn(
        'scrollbar-w-2 scrollbar-thumb-rounded scrollbar-track-primary scrollbar-thumb mb-6 mt-4 flex h-[251px] w-full gap-5 overflow-y-clip overflow-x-scroll'
      )}
    >
      {data?.map((item, i) => (
        <QuestCard
          tribeId={item.tribeId ?? ''}
          author={item.author ?? ''}
          questId={item.id ?? ''}
          description={item.description ?? ''}
          imageAlt={''}
          imageSrc={item.questImage ?? ''}
          title={item.title ?? ''}
          key={`quest-card-${i}-${item.title}`}
        />
      ))}
      {/* {hasNextPage ? <QuestCardInfiniteQuerySkelton ref={ref} /> : null} */}
    </div>
  )
}
