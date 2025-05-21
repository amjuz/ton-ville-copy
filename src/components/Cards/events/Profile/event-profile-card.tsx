import Image from 'next/image'
import React from 'react'
import Mock from '@/assets/images/mock/Event_profile_mock_1.jpeg'
import Link from 'next/link'

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
  return (
    <Link href={`/protected/core/tribe/${tribeId}/events/${eventId}`}>
      <div className="">
        <Image
          src={src ?? Mock.src}
          alt="Event Profile card"
          width={720}
          height={720}
          className="aspect-square max-w-[164px] rounded-xl object-cover"
        />
        <div className="w-full max-w-[160px]">
          <p className="ml-1 mt-1 line-clamp-2 text-sm font-semibold">{title}</p>
          <p className="ml-1 truncate text-sm text-muted-foreground">{genre}</p>
        </div>
      </div>
    </Link>
  )
}
