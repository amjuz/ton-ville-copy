'use client'
import { useQuery } from '@tanstack/react-query'
import Mock1 from '@/assets/images/mock/Event_profile_mock_1.jpeg'
import Mock2 from '@/assets/images/mock/event_profile_mock_2.jpeg'
import EventProfileCard from '@/components/Cards/events/Profile/event-profile-card'
import { getTribeEvents } from '@/lib/supabase/events/events-table'
import { cn } from '@/lib/utils/cn'
type TEventProfileWrapper = {
  className?: string
  tribeId: string
}
export default function EventProfileWrapper({ className, tribeId }: TEventProfileWrapper) {
  const { data, error } = useQuery({
    queryKey: ['tribes-events', tribeId],
    queryFn: () => getTribeEvents({ tribeId }),
  })

  if (error) return null

  if (!data?.length) return <div className="">Create new Events to display content</div>

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
