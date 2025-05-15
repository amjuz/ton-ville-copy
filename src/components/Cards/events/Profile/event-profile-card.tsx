import Image from 'next/image'
import React from 'react'
import Mock from '@/assets/images/mock/Event_profile_mock_1.jpeg'
type TEventProfileCard = {
  src?: string
  title: string
  network: string
}
export default function EventProfileCard({ src, title, network }: TEventProfileCard) {
  return (
    <div>
      <Image
        src={src ?? Mock.src}
        alt="Event Profile card"
        width={720}
        height={720}
        className="aspect-square max-w-[164px] rounded-xl object-cover"
      />
      <div>
        <p className="ml-1 mt-1 text-sm font-semibold">{title}</p>
        <p className="ml-1 text-sm text-muted-foreground">{network}</p>
      </div>
    </div>
  )
}
