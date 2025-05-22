import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'
import { formatDate } from '@test/utils/utils'
import { useQuery } from '@tanstack/react-query'
import Avatar from '@/components/Elements/avatar'

export type TMiniCard = {
  imageUrl: StaticImageData | string
  imageAlt: string
  userName: string
  title: string
  date: string
  place: string
  eventId: string
  tribeId: string
}

export default function MiniCard({
  date,
  imageUrl,
  place,
  tribeId,
  title,
  userName = 'John Wick',
  imageAlt,
  eventId,
}: TMiniCard) {
  const formattedDate = formatDate(date, 'do MMMM')
  // const  { } = useQuery({queryKey: [],queryFn: ()=>getTribeIdOfEvent(id)})

  return (
    <div className="relative flex w-full max-w-[350px] gap-2">
      <Link
        className="absolute h-full w-full"
        href={`/protected/core/tribe/${tribeId}/events/${eventId}`}
      />
      <div className="h-24 w-24">
        <Image
          src={imageUrl}
          height={720}
          width={720}
          className="h-24 w-24 rounded-xl object-cover"
          alt={imageAlt}
        />
      </div>
      <div className="flex flex-col">
        {/* @TODO add in src to replace the with defaulted image. */}
        <div className="flex items-center">
          <Avatar AvtImageClassName="w-4 h-4" />
          <p className="text-sm">{userName}</p>
        </div>
        <p className="w-full max-w-[230px] truncate text-ellipsis py-0.5 font-medium">{title}</p>
        <div>
          {/* add date-fns to handle this date conversion. */}
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
        <p className="text-sm text-muted-foreground/90">{place}</p>
      </div>
    </div>
  )
}
