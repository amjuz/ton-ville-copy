import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ApeProfile from '@/assets/images/mock/Ape_With_headphone.jpg'

interface ISearchTribeCard {
  tribePic: string
  tribeTitle?: string
  userName?: string
  followers?: number
}

export default function SearchTribeCard({
  tribePic,
  followers,
  tribeTitle,
  userName,
}: ISearchTribeCard) {
  return (
    <div className="relative grid aspect-square w-full max-w-[238px] flex-shrink-0 grid-rows-2 overflow-hidden rounded-xl bg-[#181818] hover:opacity-80">
      <Link className="absolute h-full w-full" href={'/protected/core/tribe/Hard Apes'} />
      <Image
        src={tribePic ?? ApeProfile}
        className="h-full w-full object-cover"
        alt="Banner image for Ape Image"
        width={720}
        height={480}
      />
      <div className="px-2 pt-2">
        <h1 className="text- font-medium">{tribeTitle}</h1>
        <p className="text-sm text-muted-foreground">{userName}</p>
        <p className="text-sm text-muted-foreground">
          <span>{followers}</span> Tribesmen
        </p>
      </div>
    </div>
  )
}

export function SkeltonSearchTribeCard({ count }: { count?: number }) {
  return (
    <div className="grid w-full grid-cols-2 gap-2">
      {Array.from({ length: count ?? 10 }).map((_, i) => (
        <div
          className="relative grid aspect-square w-full max-w-[238px] flex-shrink-0 grid-rows-2 overflow-hidden rounded-xl bg-[#181818] hover:opacity-80"
          key={`search-tribe-skelton-${i}`}
        >
          {/* Image skeleton */}
          <div className="h-full w-full animate-pulse bg-gray-800" />

          {/* Content section */}
          <div className="px-2 pt-2">
            {/* Title skeleton */}
            <div className="h-5 w-3/4 animate-pulse rounded bg-gray-800" />

            {/* Username skeleton */}
            <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-gray-800" />

            {/* Followers count skeleton */}
            <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
  )
}
