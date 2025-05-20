'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Suspense, useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
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
import { fetchUniqueTribe } from '@/lib/supabase/profile/user'
import TribePageSkelton from '../skelton/tribe-page-skelton'
import SetTwitterName from '@/app/protected/core/profile/[id]/components/set-twitter-name'
import CreateQuestForm from '../forms/create-quest-form'
import CreateEventForm from '../forms/create-event-form'
import DateAndTimePicker from '../originui/calendar/date-and-time-picker'

export default function TribePage() {
  const [openQuestDialog, setOpenQuestDialog] = useState(false)
  const [openEventsDialog, setOpenEventsDialog] = useState(false)

  const params = useParams()
  const tribeId = params.tribeId as string

  const { data, error, isLoading } = useQuery({
    queryKey: [`tribe-page-${tribeId}`],
    queryFn: () => fetchUniqueTribe(tribeId),
  })
  //   console.log("data",data);

  if (error || !data) {
    return <>Fetch failed</>
  }
  //   if(isLoading) return <TribePageSkelton/>
  return (
    <main className="pb-12">
      <div className="relative">
        <figure>
          <Image
            alt="Tribe background image"
            width={1920}
            height={1080}
            src={data.tribe_cover_photo ?? ApeGroupPic.src}
            className="aspect-video object-cover"
          />
        </figure>
        <div className="absolute bottom-0 h-[25%] w-full bg-gradient-to-t from-primary-foreground/60 to-primary-foreground/5" />
        <figure className="absolute -bottom-10 left-4 z-10 max-w-fit">
          <Avatar
            src={data.tribe_photo ?? ProfilePicture.src}
            AvtImageClassName="max-w-20 max-h-20 w-full h-full aspect-sqqure"
          />
        </figure>
      </div>
      <div className="mt-12 px-5">
        <div className="flex items-center justify-between">
          <h1 className="to text-xl font-bold">{data.tribe_name}</h1>
          <div className="flex items-center gap-2 rounded-2xl bg-primary-foreground/80 px-3 py-2">
            <TribeCoin />
            <span className="text-sm font-bold">{data.gems === 0 ? 20.2 : data.gems}</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <p>By</p>
            <Link href={'/protected/core/profile/dasdas'} className="text-blue-500">
              {data.author}
            </Link>
            <div className="primary-foreground ml-2 flex items-center gap-0.5 rounded-full px-1.5">
              <div className="h-4 w-4">
                <Twitter />
              </div>
              {!data.twitter_id ? (
                <SetTwitterName tribeId={tribeId} />
              ) : (
                <Link
                  href={`https://x.com/${`${data.twitter_id}`}`}
                  target="_blank"
                  className="text-sm"
                >
                  {data.twitter_id}
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2">
          {/* need to put mdx here probably. to transalate md. or its formatting. for much more user exp. */}
          <p className="text-sm text-muted-foreground">
            {data.description}
            {/* We are apes. <br /> Apes together strong!{' '} */}
          </p>
        </div>

        <TribeProfileButtonWrapper
          setOpenEventDialog={setOpenEventsDialog}
          setOpenQuestDialog={setOpenQuestDialog}
        />

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
          {/* <Suspense fallback={<QuestCardSkelton count={4} />}> */}
          <QuestsWrapperCards className="mt-3" />
          {/* </Suspense> */}
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
      <CreateQuestForm open={openQuestDialog} onOpenChange={setOpenQuestDialog} tribeId={tribeId} />
      <CreateEventForm
        open={openEventsDialog}
        onOpenChange={setOpenEventsDialog}
        tribeId={tribeId}
      />
    </main>
  )
}
