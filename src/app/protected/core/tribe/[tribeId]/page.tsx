import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import ProfilePicture from '@/assets/images/mock/Animi_Profile_Icon.jpeg'
import ApeGroupPic from '@/assets/images/mock/Ape_gang_Image.png'
import QuestsWrapperCards from '@/components/Cards/Quests/quests-wrapper-cards'
import Avatar from '@/components/Elements/avatar'
import TribeCoin from '@/components/Icons/TribeCoin'
import Twitter from '@/components/Icons/Twitter'
import TelegramIconTextTile from '@/components/tiles/telegram-icon-text-tile'
import TitleLinkCombo from '@/components/titles/title-link-combo'
import TribeProfileButtonWrapper from '@/containers/wrappers/buttons/tribe-button-wrapper'
import EventProfileWrapper from '@/containers/wrappers/event-profile-wrapper'
import QuestCardSkelton from '@/components/skelton/QuestCardSkelton'

export default async function TribePage() {
  return (
    <main className="pb-12">
      <div className="relative">
        <figure>
          <Image
            alt="Tribe background image"
            width={1920}
            height={1080}
            src={ApeGroupPic.src}
            className="aspect-video object-cover"
          />
        </figure>
        <div className="absolute bottom-0 h-[25%] w-full bg-gradient-to-t from-primary-foreground/60 to-primary-foreground/5" />
        <figure className="absolute -bottom-10 left-4 z-10 max-w-fit">
          <Avatar
            src={ProfilePicture.src}
            AvtImageClassName="max-w-20 max-h-20 w-full h-full aspect-sqqure"
          />
        </figure>
      </div>
      <div className="mt-12 px-5">
        <div className="flex items-center justify-between">
          <h1 className="to text-xl font-bold">Hard Apes</h1>
          <div className="flex items-center gap-2 rounded-2xl bg-primary-foreground/80 px-3 py-2">
            <TribeCoin />
            <span className="text-sm font-bold">{20.2}</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <p>By</p>
            <Link href={'/protected/core/profile/dasdas'} className="text-blue-500">
              Shikong
            </Link>
            <div className="primary-foreground ml-2 flex items-center gap-0.5 rounded-full px-1.5">
              <div className="h-4 w-4">
                <Twitter />
              </div>
              <Link href={`https://x.com/${'Shikong'}`} target="_blank" className="text-sm">
                Shikong
              </Link>{' '}
            </div>
          </div>
        </div>
        <div className="mt-2">
          {/* need to put mdx here probably. to transalate md. or its formatting. for much more user exp. */}
          <p className="text-sm text-muted-foreground">
            We are apes. <br /> Apes together strong!{' '}
          </p>
        </div>
        <TribeProfileButtonWrapper />
        <div className="mt-4 flex flex-col gap-2">
          <TelegramIconTextTile title="Hard Apes' Alpha" />
          <TelegramIconTextTile title="Hard Apes' Alpha" />
        </div>
        <div className="mt-4">
          <TitleLinkCombo
            titleClassName="font-normal text-sm text-muted-foreground"
            emoji={false}
            href="/"
            title="QUEST"
          />
          <Suspense fallback={<QuestCardSkelton count={4} />}>
            <QuestsWrapperCards className="mt-3" />
          </Suspense>
        </div>
        <div className="mt-4">
          <TitleLinkCombo
            titleClassName="font-normal text-sm text-muted-foreground"
            emoji={false}
            href="/"
            title="EVENTS"
          />
          <div className="mt-4">
            <EventProfileWrapper />
          </div>
        </div>
      </div>
    </main>
  )
}
