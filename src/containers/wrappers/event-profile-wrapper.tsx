'use client'
import { useQuery } from '@tanstack/react-query'
import Mock1 from '@/assets/images/mock/Event_profile_mock_1.jpeg'
import Mock2 from '@/assets/images/mock/event_profile_mock_2.jpeg'
import EventProfileCard from '@/components/Cards/events/Profile/event-profile-card'
import { getTribeEvents } from '@/lib/supabase/events/events-table'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
type TEventProfileWrapper = {
  className?: string
  tribeId: string
  setOpenEventDialog: (state: boolean) => void
}
export default function EventProfileWrapper({
  setOpenEventDialog,
  className,
  tribeId,
}: TEventProfileWrapper) {
  const { data, error } = useQuery({
    queryKey: ['tribes-events', tribeId],
    queryFn: () => getTribeEvents({ tribeId }),
  })

  if (error) return null

  if (!data?.length)
    return (
      <div className="flex justify-between rounded-lg border bg-muted p-3 text-sm">
        <p className="text-blue-400">Create new Events to display content.</p>
        <div
          className="cursor-pointer border font-bold underline"
          onClick={() => setOpenEventDialog(true)}
        >
          Create
        </div>
      </div>
    )

  return (
    <div
      className={cn(
        'scrollbar-w-2 scrollbar-thumb-rounded scrollbar-track-primary scrollbar-thumb mt-2 flex w-full gap-5 overflow-x-scroll',
        className
      )}
    >
      {data.map((item, index) => {
        return (
          <EventProfileCard
            tribeId={tribeId}
            eventId={item.id}
            title={item.title ?? ''}
            genre={item.genre ?? ''}
            src={item.eventPhoto ?? Mock1.src}
            key={`${index}-tribe-events`}
          />
        )
      })}
    </div>
  )
}
