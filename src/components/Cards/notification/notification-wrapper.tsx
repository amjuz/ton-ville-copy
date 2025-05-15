'use client'

import { useNotification } from '@/hooks/useCustomHooks'
import NotificationCard from './notification-card'
import { cn } from '@/lib/utils/cn'

export default function NotificationWrapper() {
  const data = useNotification({})
  /**
   * Pending updates
   * - filter notification based on date
   * - initial notification fetching query
   * - infinite notification fetching query
   * - websocket connection for live notification update
   * - new notification animation
   *  */
  return data.map(({ message, notificationImage, profileImage, user, date }, i) => (
    <div
      className={cn(
        'flex transform flex-col-reverse transition-all duration-100 ease-in-out animate-in fade-in-15 slide-in-from-top-5'
      )}
      key={`notification-card-${i}`}
    >
      <NotificationCard
        message={message}
        user={user}
        notificationImage={notificationImage}
        profileImage={profileImage}
        date={date}
      />
    </div>
  ))
}
