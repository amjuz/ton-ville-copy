import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import ApeGroupPic from '@/assets/images/mock/Ape_gang_Image.png'
import TribeCoin from '@/components/Icons/TribeCoin'
import { getGroupEventsQuestCount } from '@/lib/utils/formatter/text-formatter'
import { TgetGroupEventsQuestCountParams } from '@/types/app/tribes'
import { cn } from '@/lib/utils/cn'
import { Skeleton } from '@/components/ui/skeleton'

type TProfileTribeCard = {
  tribeName: string
  tribePoints: number | string
  tribeCoverPhoto: string
  tribePhoto: string
  subscribers: number
  author: string
  description: string
  gems: number
  tribeId: string
} & TgetGroupEventsQuestCountParams

export default function ProfileTribeCard({
  author,
  description,
  gems,
  subscribers,
  tribeCoverPhoto,
  tribePhoto,
  tribeName,
  tribeId,
  ...counts
}: TProfileTribeCard) {
  const [isLoading, setIsLoading] = useState(true)
  return (
    <div className="mt-8 px-2 sm:px-6">
      <div className="relative mt-4 w-full overflow-hidden rounded-2xl border-2">
        <div className="relative">
          {isLoading && (
            <Skeleton className="absolute inset-0 left-0 top-0 h-full w-full rounded-t-2xl bg-muted/60" />
          )}

          <Image
            alt="tribe_cover-photo"
            src={tribeCoverPhoto}
            className={cn(
              'aspect-video h-full max-h-[220px] w-full rounded-2xl border-2 object-cover transition-all duration-500 sm:aspect-[16/10]',
              isLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'
            )}
            width={720}
            height={420}
            onLoadingComplete={() => setIsLoading(false)}
          />
        </div>
        <div className="absolute bottom-0 h-full max-h-[35%] w-full bg-gradient-to-t from-primary-foreground to-primary-foreground/20">
          <div className="flex w-full justify-between px-6 pt-2">
            <h1 className="text-xl font-bold">{tribeName}</h1>
            <div className="flex items-center gap-2">
              <TribeCoin />
              <span className="text-sm font-bold">{gems}</span>
            </div>{' '}
          </div>
          <div className="px-6">
            <p className="text-sm text-muted-foreground">
              {getGroupEventsQuestCount({ ...counts })}
            </p>
          </div>
        </div>
        <Link className="absolute top-0 h-full w-full" href={`/protected/core/tribe/${tribeId}`} />
      </div>
    </div>
  )
}
