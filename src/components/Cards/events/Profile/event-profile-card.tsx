import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'
import Mock from '@/assets/images/mock/Event_profile_mock_1.jpeg'
import { cn } from '@/lib/utils/cn'
import { Skeleton } from '@/components/ui/skeleton'

type TEventProfileCard = {
  src?: string
  title: string
  genre: string
  eventId: string
  tribeId: string
}
export default function EventProfileCard({
  src,
  title,
  genre,
  eventId,
  tribeId,
}: TEventProfileCard) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Link href={`/protected/core/tribe/${tribeId}/events/${eventId}`}>
      <div className="">
        <div className="relative">
          {true && (
            <Skeleton className="absolute inset-0 h-full w-full rounded-t-2xl bg-muted/60" />
          )}
          <Image
            src={src ?? Mock.src}
            alt="Event Profile card"
            width={720}
            height={720}
            className={cn(
              'aspect-square max-w-[164px] rounded-xl object-cover transition-all duration-500',
              isLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'
            )}
            onLoadingComplete={() => setIsLoading(false)}
          />
        </div>
        <div className="w-full max-w-[160px] pt-2">
          <p className="ml-1 mt-1 line-clamp-2 text-sm font-semibold">{title}</p>
          <p className="ml-1 truncate text-sm text-muted-foreground">{genre}</p>
        </div>
      </div>
    </Link>
  )
}
