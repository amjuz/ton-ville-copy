import { Skeleton } from '../ui/skeleton'

export default function ChiefSearchCardPopularItemsSkelton({ count = 1 }: { count?: number }) {
  return (
    <div className="w-full space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          className="flex w-full gap-4 overflow-hidden rounded-xl py-2"
          key={`search-card-item-${i}`}
        >
          <div className="">
            <Skeleton className="h-16 w-16 rounded-full bg-gray-800" />
          </div>
          <div className="flex w-full flex-col justify-between">
            <Skeleton className="h-4 w-36 bg-gray-800" />
            <Skeleton className="h-3 w-16 bg-gray-800" />
            <div className="">
              <Skeleton className="h-5 w-64 bg-gray-800" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
