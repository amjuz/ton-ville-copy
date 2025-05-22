import Image, { StaticImageData } from 'next/image'
import React from 'react'
import Link from 'next/link'
import { FormatNumber } from '@test/utils/utils'
import { cn } from '@/lib/utils/cn'
import ApeRed from '@/assets/images/mock/Ape_profile_pic_MOCK.jpeg'
import ApeProfile from '@/assets/images/mock/Ape_profile_pic_MOCK.jpeg'
import Avatar from '@/components/Elements/avatar'
import TribeCoin from '@/components/Icons/TribeCoin'
// import { cn } from '@/lib/utils/cn'

type TTrendingCard = {
  tribeName: string
  rank: number
  authorName: string
  totalMembers: number
  tribeImage: string | StaticImageData
  tribeProfilePic: string | StaticImageData
  className?: string
  id: string
}

export default function TrendingCard({
  authorName,
  rank,
  tribeName,
  totalMembers,
  tribeImage,
  className,
  id,
  tribeProfilePic,
}: TTrendingCard) {
  const formattedTotalMembers = FormatNumber(totalMembers)
  const formattedRank = FormatNumber(rank)
  return (
    <article
      className={cn(
        'relative grid aspect-square w-full max-w-[238px] flex-shrink-0 grid-rows-2 overflow-hidden rounded-2xl',
        className
      )}
    >
      <Link className="absolute h-full w-full" href={`/protected/core/tribe/${id}`} />

      <Image
        src={tribeImage ?? ApeRed.src}
        width={480}
        height={480}
        alt=""
        className="h-full w-full object-cover"
      />
      <div className="relative">
        <div className="absolute -top-7 left-2 z-50">
          {/* move this logic when implemented database urls. */}
          <Avatar
            src={
              typeof tribeProfilePic === 'string'
                ? tribeProfilePic
                : (tribeProfilePic.src ?? ApeProfile.src)
            }
          />
        </div>
        <div className="relative -top-3 h-full w-full bg-muted/5 px-2 py-7 backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <h4 className="max-w-[158px] truncate text-ellipsis font-medium">{tribeName}</h4>
            <div className="flex items-center gap-2 rounded-2xl bg-black/80 px-2 py-2">
              <TribeCoin />
              <span className="text-sm font-bold">{formattedRank}</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{authorName}</p>
            <p className="text-sm text-muted-foreground">{formattedTotalMembers} Tribesmen</p>
          </div>
        </div>
      </div>
    </article>
  )
}
