import Image from 'next/image'
import React from 'react'
import GemBlue from '@/assets/images/gem_image_static.png'

export default function EarnHeroCard() {
  return (
    <div className="flex h-full w-full place-content-center place-items-center items-center justify-center gap-4 rounded-2xl border bg-primary-foreground/60 px-4 py-4 backdrop-blur-sm">
      <div className="h-full w-max">
        <h1 className="text-2xl font-bold sm:text-3xl">Earn Gems!</h1>
        <p className="text-base text-muted-foreground">Top up gems & rise up in leaderboard</p>
      </div>
      <div className="">
        <div>
          <div className="h-full max-h-32 w-full max-w-32">
            <div className="mt-2 h-full w-full">
              <Image src={GemBlue.src} alt="gem" width={512} height={512} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
