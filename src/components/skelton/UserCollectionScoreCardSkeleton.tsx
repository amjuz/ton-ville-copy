export function UserCollectionScoreCardSkeleton() {
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-4 px-2 py-12 md:flex md:max-w-xs md:flex-col">
        <div className="animate-pulse">
          <div className="flex items-center space-x-4 rounded-lg bg-gray-800 p-4">
            <div className="h-12 w-12 rounded-full bg-gray-700"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-gray-700"></div>
              <div className="h-6 w-1/2 rounded bg-gray-700"></div>
            </div>
          </div>
        </div>
        <div className="animate-pulse">
          <div className="flex items-center space-x-4 rounded-lg bg-gray-800 p-4">
            <div className="h-12 w-12 rounded-full bg-gray-700"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-gray-700"></div>
              <div className="h-6 w-1/2 rounded bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
