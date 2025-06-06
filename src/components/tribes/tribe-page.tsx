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
import TribesFormDialog from './TribesFormDialog'
import QuestsForTribe from '../Cards/Quests/quests-for-tribe'
import ErrorPageDisplay from '../error/error-page-display'
import { Tables } from '@/types/database'
import TribePageCoverPhoto from './tribe-page-cover-photo'
import { Skeleton } from '../ui/skeleton'
import { TruncateText } from '@test/utils/utils'

export default function TribePage() {
  const [openQuestDialog, setOpenQuestDialog] = useState(false)
  const [openEventsDialog, setOpenEventsDialog] = useState(false)

  const params = useParams()
  const tribeId = params.tribeId as string

  const { data, error, isLoading } = useQuery({
    queryKey: [`tribe-page-${tribeId}`],
    queryFn: () => fetchUniqueTribe(tribeId),
  })

  if (isLoading || !data) return <TribePageSkelton />
  if (error) {
    return <ErrorPageDisplay message="Failed to load tribes page, please retry" />
  }

  //   if(isLoading) return <TribePageSkelton/>
  return (
    <main className="pb-12">
      <div className="relative">
        <TribePageCoverPhoto image={data?.tribe_cover_photo ?? ''} />

        <div className="absolute bottom-0 h-[25%] w-full bg-gradient-to-t from-primary-foreground/60 to-primary-foreground/5" />
        <figure className="absolute -bottom-10 left-4 z-10 max-w-fit">
          <Avatar
            src={data.tribe_photo ?? ProfilePicture.src}
            AvtImageClassName="max-w-20 max-h-20 w-full h-full aspect-sqqure"
            avatarFallback={<Skeleton className="h-20 w-20" />}
            fallbackTitle=""
          />
        </figure>
      </div>
      <div className="mt-12 px-5">
        <div className="flex items-center justify-between">
          <h1 className="to text-xl font-bold">{data?.tribe_name}</h1>
          {/* <div className="flex items-center gap-2 rounded-2xl bg-primary-foreground/80 px-3 py-2">
            {/* <TribeCoin /> */}
          {/* <span className="text-sm font-bold">{data?.gems === 0 ? 20.2 : data?.gems}</span> */}
          {/* </div> */}
        </div>
        <div>
          <div className="flex items-center gap-1">
            <p>By</p>
            <Link href={'#'} className="line-clamp-1 text-blue-500">
              {TruncateText(data?.author ?? '', 10)}
            </Link>
            <div className="primary-foreground ml-2 flex items-center gap-0.5 rounded-full px-1.5">
              <div className="h-4 w-4">
                <Twitter />
              </div>
              {!data?.twitter_id ? (
                <SetTwitterName tribeId={tribeId} />
              ) : (
                <Link
                  href={`https://x.com/${`${data?.twitter_id}`}`}
                  target="_blank"
                  className="text-sm"
                >
                  {data?.twitter_id}
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2">
          {/* need to put mdx here probably. to transalate md. or its formatting. for much more user exp. */}
          <p className="text-sm text-muted-foreground">
            {data?.description}
            {/* We are apes. <br /> Apes together strong!{' '} */}
          </p>
        </div>

        <TribeProfileButtonWrapper
          setOpenEventDialog={setOpenEventsDialog}
          setOpenQuestDialog={setOpenQuestDialog}
          tribeData={data ?? ({} as Tables['tribes']['Row'])}
        />

        {/* <div className="mt-4 flex flex-col gap-2">
            <TelegramIconTextTile title="Hard Apes' Alpha" />
            <TelegramIconTextTile title="Hard Apes' Alpha" />
          </div> */}
        <div className="mt-4">
          <TitleLinkCombo
            titleClassName="font-normal text-sm text-muted-foreground"
            emoji={false}
            href="/"
            title="QUEST"
          />
          <QuestsForTribe setOpenQuestDialog={setOpenQuestDialog} tribeId={tribeId} />
          {/* <QuestsWrapperCards className="mt-3" /> */}
        </div>
        <div className="mt-4">
          <TitleLinkCombo
            titleClassName="font-normal text-sm text-muted-foreground"
            emoji={false}
            href="/"
            title="EVENTS"
          />
          <div className="mt-4">
            <EventProfileWrapper tribeId={tribeId} setOpenEventDialog={setOpenEventsDialog} />
          </div>
        </div>
      </div>
      {/* Dialog boxes */}

      <CreateQuestForm open={openQuestDialog} onOpenChange={setOpenQuestDialog} tribeId={tribeId} />
      <CreateEventForm
        open={openEventsDialog}
        onOpenChange={setOpenEventsDialog}
        tribeId={tribeId}
      />
    </main>
  )
}
