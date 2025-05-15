import NotificationCard from '@/components/Cards/notification/notification-card'
import DP from '@/assets/images/mock/chiefAvatar/chiefPic2.jpeg'
import tribePic from '@/assets/images/mock/Ape_With_headphone.jpg'
import NotificationWrapper from '@/components/Cards/notification/notification-wrapper'

export default function page() {
  return (
    <main className="px-4">
      <header>
        <h3 className="py-4 text-lg font-bold">Notifications</h3>
      </header>
      {/* Date filter display header component  */}
      <div className="">
        <p className="py-1 text-base font-normal text-muted-foreground">Today</p>
      </div>
      {/* notification card */}
      <div className="flex flex-col gap-2">
        <NotificationWrapper />
      </div>
    </main>
  )
}
