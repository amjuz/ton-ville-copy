'use client'

import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { TFetchQuestCards } from '@/functions'
import { useQuestInfinityQuery } from '@/hooks/useCustomHooks'
import { cn } from '@/lib/utils/cn'
import QuestCard from './quest-card'
import { QuestCardInfiniteQuerySkelton } from '@/components/skelton/QuestCardSkelton'
import QuestCardOld from './quest-card-old'

interface IQuestCardList {
  initialData: TFetchQuestCards
}
export default function QuestCardList({ initialData }: IQuestCardList) {
  const { data, fetchNextPage, hasNextPage } = useQuestInfinityQuery({
    initialData,
    limit: 8,
  })

  const { inView, ref } = useInView({
    rootMargin: '0px 0px',
  })

  useEffect(() => {
    fetchNextPage()
  }, [inView, fetchNextPage])
  return (
    <div
      className={cn(
        'scrollbar-w-2 scrollbar-thumb-rounded scrollbar-track-primary scrollbar-thumb mb-6 mt-4 flex h-[251px] w-full gap-5 overflow-y-clip overflow-x-scroll'
      )}
    >
      {data.pages.map((items) =>
        items.mockData.map((item, i) => (
          <QuestCardOld
            description={item.description}
            imageAlt={item.imageAlt}
            imageSrc={item.imageSrc}
            title={item.title}
            key={`quest-card-${i}-${item.title}`}
          />
        ))
      )}
      {hasNextPage ? <QuestCardInfiniteQuerySkelton ref={ref} /> : null}
    </div>
  )
}
