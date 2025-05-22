import { Skeleton } from '../ui/skeleton'

export default function ImageUploadSkelton() {
  return (
    <main className="animate-pulse px-4 pt-2">
      <div className="space-y-6">
        <div className="mt-4 h-56 w-full rounded bg-muted" />
        {/* Display Name Section */}
        <div>
          <div className="flex items-center justify-between">
            <Skeleton className="my-4 h-6 w-32" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-12 w-full rounded-md" />
        </div>

        {/* Bio Section */}
        <div>
          <div className="flex items-center justify-between">
            <Skeleton className="my-4 h-6 w-20" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-12 w-full rounded-md" />
        </div>

        {/* Skills Section */}
        <div className="flex flex-col">
          <Skeleton className="mb-2 mt-4 h-6 w-16" />

          {/* Skills Display Area */}
          <div className="mb-4 space-y-2">
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-16 rounded-full" />
            </div>
          </div>

          {/* Add Skills Button */}
          <div>
            <Skeleton className="mt-4 h-6 w-24" />
          </div>
        </div>

        {/* Save Button */}
        <Skeleton className="my-4 h-12 w-full rounded-md" />
      </div>
      {/* <div className="mt-4 space-y-6"> */}
      {/* <div className="my-5 h-8 w-40 rounded bg-muted" /> */}

      {/* Image Skeleton */}
      {/* <div className="h-24 w-24 rounded-full bg-muted" /> */}

      {/* Display Name */}
      {/* <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="h-5 w-28 rounded bg-muted" />
            <div className="h-4 w-12 rounded bg-muted" />
          </div>
          <div className="h-12 rounded bg-muted" />
        </div> */}

      {/* Bio */}
      {/* <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="h-5 w-28 rounded bg-muted" />
            <div className="h-4 w-12 rounded bg-muted" />
          </div>
          <div className="h-20 rounded bg-muted" />
        </div> */}

      {/* Skills */}
      {/* <div className="space-y-2">
          <div className="h-5 w-20 rounded bg-muted" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-8 w-full rounded bg-muted" />
          ))}
          <div className="h-5 w-24 rounded bg-muted" />
        </div> */}

      {/* Save Button */}
      {/* </div> */}
    </main>
  )
}
