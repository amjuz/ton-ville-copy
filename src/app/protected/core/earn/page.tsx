import Image from 'next/image'
import DiscordIcon from '@/assets/images/discord_2xl.jpeg'
import TelegramIcon from '@/assets/images/telegram_2x.png'
import DailyRewardCard from '@/components/Cards/Earn/daily-reward'
import EarnHeroCard from '@/components/Cards/Earn/earn-hero-card'
import ReferAndEarnCard from '@/components/Cards/Earn/refer--and-earn'
import { TwitterOutline } from '@/components/Icons/TwitterOutline'
import TaskTiles from '@/components/tiles/task-tiles'
import TitleLinkCombo from '@/components/titles/title-link-combo'

export default function EarnPage() {
  return (
    <main className="mt-4 px-1">
      <EarnHeroCard />
      <div className="mt-4 w-full">
        <div className="grid grid-cols-2 gap-2 px-1">
          <div className="aspect-square rounded-xl border-2">
            <DailyRewardCard />
          </div>
          <div className="aspect-square rounded-xl border-2">
            {/* generate referral link and pass it down to this component */}
            <ReferAndEarnCard referralLink="www.example.com" />
          </div>{' '}
        </div>
        <div className="mt-4 px-2">
          <TitleLinkCombo replaceSeeAll={false} href="/" title="Tasks" emoji="⚡" />
          <div className="my-4 flex w-full flex-col gap-2">
            <TaskTiles
              reward={200}
              completed={false}
              icon={
                <div className="max-w-max rounded-full bg-primary-foreground p-2.5">
                  <TwitterOutline className="h-4 w-4 shadow-sm" />
                </div>
              }
              title="Follow Twitter"
            />
            <TaskTiles
              reward={200}
              completed={false}
              icon={
                <div className="h-8 w-8">
                  <Image src={TelegramIcon.src} alt="Telegram Icon" width={256} height={256} />
                </div>
              }
              title="Join Telegram"
            />
            <TaskTiles
              reward={200}
              completed={true}
              icon={
                <div className="h-8 w-8">
                  <Image src={TelegramIcon.src} alt="Telegram Icon" width={256} height={256} />
                </div>
              }
              title="Join Announcements"
            />
            <TaskTiles
              reward={200}
              completed={true}
              icon={
                <div className="h-8 w-8 overflow-hidden rounded-full">
                  <Image src={DiscordIcon.src} alt="Telegram Icon" width={256} height={256} />
                </div>
              }
              title="Join Discord"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
