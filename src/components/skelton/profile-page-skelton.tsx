import React from 'react'

export default function ProfilePageSkelton() {
  return (
    <div className="mb-12 px-2 sm:px-4">
      <div className="flex items-center justify-center px-12 pt-12">
        <div className="relative h-32 w-32">
          <div className="h-full w-full animate-pulse rounded-full bg-muted" />
          <div className="absolute -right-2 top-[10%] rounded-full bg-[linear-gradient(180deg,_#F5A243_0%,_#FF6200_100%)] px-2 py-1">
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 animate-pulse rounded-full bg-white/40" />
              <div className="h-4 w-6 animate-pulse rounded bg-white/40" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center">
        <div className="flex items-center gap-2">
          <div className="h-5 w-24 animate-pulse rounded bg-muted" />
          <div className="h-4 w-4 animate-pulse rounded-full bg-muted" />
        </div>

        <div className="mt-1 h-4 w-20 animate-pulse rounded bg-muted" />

        <div className="mt-3 h-12 w-64 animate-pulse rounded-md bg-muted sm:w-80" />

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`skill-skeleton-${i}`}
              className="h-6 w-20 animate-pulse rounded-2xl bg-muted px-4 py-2"
            />
          ))}
        </div>

        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={`tribe-skelton-${i}`}
            className="mt-4 h-44 w-full animate-pulse rounded-xl bg-muted"
          />
        ))}
      </div>
    </div>
  )
}
