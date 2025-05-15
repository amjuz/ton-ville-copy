import Mock1 from '@/assets/images/mock/Event_profile_mock_1.jpeg'
import Mock2 from '@/assets/images/mock/event_profile_mock_2.jpeg'
import EventProfileCard from '@/components/Cards/events/Profile/event-profile-card'
import { cn } from '@/lib/utils/cn'
type TEventProfileWrapper = {
  className?: string
}
export default function EventProfileWrapper({ className }: TEventProfileWrapper) {
  return (
    <div
      className={cn(
        'scrollbar-w-2 scrollbar-thumb-rounded scrollbar-track-primary scrollbar-thumb mt-2 flex w-full gap-5 overflow-x-scroll',
        className
      )}
    >
      <EventProfileCard title="1000 USDT Giveaway" network="TON Network" src={Mock1.src} />
      <EventProfileCard network="Valve Protocol" title="$30 Million Prizepool!" src={Mock2.src} />
      <EventProfileCard title="1000 USDT Giveaway" network="TON Network" src={Mock1.src} />
    </div>
  )
}
