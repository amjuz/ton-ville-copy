import { Skeleton } from "@/components/ui/skeleton"
import { EllipsisVertical } from "lucide-react"

export function QuestCardSkeleton() {
  return (
    <div className="mt-4 p-2 sm:p-4">
      {/* Image skeleton */}
      <Skeleton className="h-[300px] w-full rounded-2xl border-2" />

      <div className="mt-5 pl-1 space-y-2">
        {/* Title */}
        <Skeleton className="h-6 w-1/2" />
        {/* Subtitle */}
        <Skeleton className="h-4 w-1/4" />
        {/* Paragraph */}
        <Skeleton className="h-4 w-3/4 mt-2" />
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-2">
        <Skeleton className="h-10 basis-full rounded-xl" />
        <Skeleton className="h-10 basis-full rounded-xl" />
        <Skeleton className="h-10 basis-32 rounded-xl" />
      </div>

      {/* How to Participate */}
      <div className="mt-8 space-y-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
    </div>
  )
}
