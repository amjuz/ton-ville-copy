import { Skeleton } from "@/components/ui/skeleton"
import { EllipsisVertical } from "lucide-react"

export function EventCardSkeleton() {
  return (
    <div className="mt-4 p-2 pb-12 sm:p-4">
      <Skeleton className="aspect-square w-full rounded-2xl border-2" />

      <div className="mt-5 pl-1 space-y-2">
        <Skeleton className="h-4 w-1/4" /> {/* Category */}
        <Skeleton className="h-6 w-3/4" /> {/* Title */}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Skeleton className="h-14 w-12 rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      <div className="mt-8 flex gap-2">
        <Skeleton className="h-10 basis-full rounded-xl" />
        <Skeleton className="h-10 basis-full rounded-xl" />
        <Skeleton className="h-10 basis-32 rounded-xl" />
      </div>

      <div className="mt-4 flex items-center gap-3 text-sm">
        <div className="flex items-center pl-2 gap-[-8px]">
          <Skeleton className="h-8 w-8 rounded-full border" />
          <Skeleton className="h-8 w-8 rounded-full border -ml-2" />
          <Skeleton className="h-8 w-8 rounded-full border -ml-2" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-6" />
        </div>
      </div>

      <div className="mt-8 space-y-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[80%]" />
        <div className="mt-4">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>
      </div>
    </div>
  )
}
