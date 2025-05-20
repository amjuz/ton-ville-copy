export default function TribePageSkelton() {
  return (
    <main className="pb-12">
      <div className="relative">
        <figure>
          <div className="aspect-video w-full animate-pulse bg-muted" />
        </figure>
        <div className="absolute bottom-0 h-[25%] w-full bg-gradient-to-t from-primary-foreground/60 to-primary-foreground/5" />
        <figure className="absolute -bottom-10 left-4 z-10 max-w-fit">
          <div className="aspect-square h-full max-h-20 w-full max-w-20 animate-pulse rounded-full bg-muted" />
        </figure>
      </div>
      <div className="mt-12 px-5">
        <div className="flex items-center justify-between">
          <div className="h-6 w-32 animate-pulse rounded bg-muted" />
          <div className="flex h-8 w-20 animate-pulse items-center gap-2 rounded-2xl bg-muted px-3 py-2" />
        </div>

        <div className="mt-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 animate-pulse rounded bg-muted" />
            <div className="h-4 w-16 animate-pulse rounded bg-muted" />
            <div className="ml-2 flex h-4 w-24 animate-pulse items-center gap-1 rounded bg-muted" />
          </div>
        </div>

        <div className="mt-2">
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <div className="h-10 w-full animate-pulse rounded bg-muted" />
          <div className="h-10 w-full animate-pulse rounded bg-muted" />
        </div>

        <div className="mt-4">
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          <div className="mt-3 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 w-full animate-pulse rounded bg-muted" />
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          <div className="mt-4 h-20 w-full animate-pulse rounded bg-muted" />
        </div>
      </div>
    </main>
  )
}
