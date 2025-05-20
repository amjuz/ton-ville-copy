export default function TribeCardSkeleton() {
  return (
    <div className="mt-8 px-2 sm:px-6">
      <div className="relative mt-4 w-full overflow-hidden rounded-2xl border-2">
        {/* Skeleton image */}
        <div className="aspect-video h-full max-h-[220px] w-full animate-pulse rounded-2xl border-2 bg-gray-200 object-cover sm:aspect-[16/10]" />

        {/* Gradient overlay with skeleton content */}
        <div className="absolute bottom-0 h-full max-h-[35%] w-full bg-gradient-to-t from-primary-foreground to-primary-foreground/20">
          <div className="flex w-full justify-between px-6 pt-2">
            {/* Tribe name skeleton */}
            <div className="h-7 w-32 animate-pulse rounded-md bg-gray-300" />

            {/* Points skeleton */}
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 animate-pulse rounded-full bg-gray-300" />
              <div className="h-5 w-12 animate-pulse rounded-md bg-gray-300" />
            </div>
          </div>

          <div className="mt-2 px-6">
            {/* Event/quest count skeleton */}
            <div className="h-4 w-48 animate-pulse rounded-md bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  )
}
