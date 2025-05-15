import Image from 'next/image'
import React from 'react'
import { TruncateText } from '@test/utils/utils'

type TSearchEventOrQuestCard = {
  type: 'quests' | 'events'
  imageSrc: string
  title?: string
  shotDescription?: string
}

export default function SearchEventOrQuestCard({
  shotDescription,
  title,
  imageSrc,
}: TSearchEventOrQuestCard) {
  const formatTitle = TruncateText(title!, 20)
  const formatShotDesc = TruncateText(shotDescription!, 50)
  return (
    <div className="relative rounded-xl hover:opacity-80">
      <div className="aspect-square w-full max-w-[238px] overflow-hidden rounded-xl">
        <Image
          // type arg was used in this component to use different images while creating
          // this component, but this is no longer required for this component, need to
          // need to refactor and rename this component and this is being used for quest
          // and event card.
          src={imageSrc}
          className="h-full w-full object-cover"
          alt="Banner image for Ape Image"
          width={720}
          height={480}
        />
      </div>
      <div className="px-2">
        <h3 className="mt-2 text-base font-medium">{formatTitle}</h3>
        <p className="text-sm text-muted-foreground">{formatShotDesc}</p>
      </div>
    </div>
  )
}

export function SkeltonSearchEventOrQuestCard({ count }: { count?: number }) {
  return (
    <div className="grid w-full grid-cols-2 gap-2">
      {Array.from({ length: count ?? 6 }).map((_, i) => (
        <div
          className="relative rounded-xl p-1 hover:opacity-80"
          key={`quest-card-search-skelton-${i}`}
        >
          {/* Image skeleton */}
          <div className="aspect-square w-full max-w-[238px] overflow-hidden rounded-xl">
            <div className="h-full w-full animate-pulse bg-gray-800" />
          </div>

          {/* Content skeleton */}
          <div className="">
            {/* Title skeleton */}
            <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-gray-800" />

            {/* Description skeleton */}
            <div className="mt-2 h-3 w-full animate-pulse rounded bg-gray-800" />
            <div className="mt-2 h-3 w-full animate-pulse rounded bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
  )
}
