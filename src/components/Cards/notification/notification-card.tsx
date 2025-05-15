import Image, { StaticImageData } from 'next/image'
import { faker } from '@faker-js/faker'
import { formatTimeDifference, TruncateText } from '@test/utils/utils'

export const NotificationTemplate = [
  'followed you',
  'added a new event to their tribe',
  'created a new tribe',
  'followed you',
  'added new skill',
  'added a new event to their tribe',
]
export default function NotificationCard({
  message,
  user,
  profileImage,
  notificationImage,
  date,
}: {
  user: string
  message: string
  profileImage: StaticImageData
  notificationImage: string
  date: Date
}) {
  const formattedMessage = TruncateText(message, 70)
  const formattedDateTime = formatTimeDifference(date)

  return (
    <div className="h-16 py-3">
      {/* avatar */}
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-[40px]">
          <Image
            alt=""
            src={profileImage}
            width={420}
            height={350}
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
        {/* p tag with notification containing username, message, date */}
        <div className="inline-flex w-full tracking-wide">
          <p className="text-[13px]">
            <strong className="text-[14px]">{user} </strong>
            {formattedMessage}.{' '}
            <span className="text-xs text-muted-foreground">{formattedDateTime}</span>
          </p>
        </div>
        {/* an image tag which may or may not come based on notification type*/}
        <div className="min-w-[40px]">
          <Image
            src={notificationImage}
            alt=""
            width={420}
            height={320}
            className="h-10 w-10 rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}
