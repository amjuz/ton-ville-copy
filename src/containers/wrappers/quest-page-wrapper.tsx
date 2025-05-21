import { EllipsisVertical } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import questPlaceHolders from '@/assets/images/mock/quest-card-mock.png'
import CustomOrderedList from '@/components/Elements/custom-ordered-list'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { getQuest } from '@/lib/supabase/quests/quests-table'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'
import { QuestCardSkeleton } from '@/components/skelton/quest-card-skeleton'

const items = [
  'Retweet and Like the tweet in the link below from your twitter account.',
  'Welcome to the Largest Prize Pool Game! We have created a few simple tasks for participating in the pool.',
  'Retweet and Like the tweet in the link below from your twitter account.',
  'Welcome to the Largest Prize Pool Game! We have created a few simple tasks for participating in the pool.',
  'Retweet and Like the tweet in the link below from your twitter account.',
]

export default function QuestPageWrapper() {
  /**
   * fetch data here
   *  so the suspense can work
   */
  const params = useParams()
  const questId = params.questId as string

  const { data, error, isLoading } = useQuery({
    queryKey: ['event-page', questId],
    queryFn: () => getQuest(questId),
  })
  if (!data) return <>No data found</>
  if (error) return <>Error fetching events</>
  if (isLoading) return <QuestCardSkeleton/>
  return (
    <div className="mt-4 p-2 sm:p-4">
      <Image
        src={data.questImage ?? questPlaceHolders.src}
        width={720}
        height={480}
        alt="Quest image fallback"
        className="rounded-2xl border-2 object-cover"
      />
      <div className="mt-5 pl-1">
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <p className="text-muted-foreground">{data.subTitle}</p>
        <p className="mt-2">
          {data.description}
        </p>
      </div>
      <div className="mt-8 flex gap-2">
        <Button size={'lg'} className="basis-full rounded-xl">
          Participate
        </Button>
        <Button size={'lg'} variant={'secondary'} className="basis-full rounded-xl">
          Share
        </Button>
        <Button size={'icon'} variant={'secondary'} className="basis-32 rounded-xl bg-secondary/70">
          <EllipsisVertical size={20} />{' '}
        </Button>
      </div>
      <div className="mt-8">
        <p className="text-lg font-bold">How to Participate?</p>
        <div className="text-sm text-muted-foreground">
          <p>
            Welcome to the Largest Prize Pool Game! We have created a few simple tasks for
            participating in the pool.
          </p>
          <div className="mt-2">
            <CustomOrderedList items={items} />
          </div>
        </div>
      </div>
    </div>
  )
}
