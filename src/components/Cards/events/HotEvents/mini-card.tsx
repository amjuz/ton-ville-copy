import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { formatDate } from '@test/utils/utils'
import Avatar from '@/components/Elements/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils/cn'

export type TMiniCard = {
  imageUrl: StaticImageData | string
  imageAlt: string
  userName: string
  title: string
  date: string
  place: string
  eventId: string
  tribeId: string
}

export default function MiniCard({
  date,
  imageUrl,
  place,
  tribeId,
  title,
  userName = 'John Wick',
  imageAlt,
  eventId,
}: TMiniCard) {
  const formattedDate = formatDate(date, 'do MMMM')
  // const  { } = useQuery({queryKey: [],queryFn: ()=>getTribeIdOfEvent(id)})
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="grid h-28 w-72 grid-cols-8 gap-3">
      <div className="col-span-3">
        {isLoading && <Skeleton className="inset-0 h-full w-full rounded-t-2xl bg-muted/60" />}
        <Image
          src={imageUrl}
          height={720}
          width={720}
          className={cn(
            'aspect-square h-full w-full rounded-xl transition-all duration-500',
            isLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'
          )}
          alt={imageAlt}
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
      <div className="col-span-5 flex flex-col justify-between py-1">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Avatar AvtImageClassName="w-4 h-4" />
            <p className="line-clamp-1 flex-1 text-sm">{userName}</p>
          </div>
          <p className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-tight">{title}</p>
        </div>
        <div className="mt-auto space-y-1">
          <p className="truncate text-xs text-muted-foreground">{formattedDate}</p>
          <p className="truncate text-xs text-muted-foreground/90">{place}</p>
        </div>
      </div>
    </div>
  )
}
// <div className="grid h-28 w-72 grid-cols-8">
//   <div className="col-span-3">
//     {isLoading && <Skeleton className="inset-0 h-full w-full rounded-t-2xl bg-muted/60" />}
//     <Image
//       src={imageUrl}
//       height={720}
//       width={720}
//       className={cn(
//         'aspect-square h-full w-full rounded-xl transition-all duration-500',
//         isLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'
//       )}
//       alt={imageAlt}
//       onLoadingComplete={() => setIsLoading(false)}
//     />
//   </div>
//   <div className="col-span-5 px-2">
//     <div className="flex flex-col">
//       <div className="flex items-center gap-1">
//         <Avatar AvtImageClassName="w-4 h-4" />
//         <p className="line-clamp-1 text-sm">{userName}</p>
//       </div>
//       <p className="line-clamp-2 w-full max-w-[230px] text-ellipsis py-0.5 font-medium">
//         {title}
//       </p>
//       <div className="">
//         <p className="truncate text-xs text-muted-foreground">{formattedDate}</p>
//         <p className="truncate text-xs text-muted-foreground/90">{place}</p>
//       </div>
//     </div>
//   </div>
// </div>

// <div className="relative flex w-full max-w-[350px] gap-2">
//   <Link
//     className="absolute h-full w-full"
//     href={`/protected/core/tribe/${tribeId}/events/${eventId}`}
//   />
//   <div className="">
//     {isLoading && <Skeleton className="inset-0 h-full w-full rounded-t-2xl bg-muted/60" />}
//     <Image
//       src={imageUrl}
//       height={720}
//       width={720}
//       className={cn(
//         'aspect-square h-full w-full rounded-xl transition-all duration-500',
//         isLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'
//       )}
//       alt={imageAlt}
//       onLoadingComplete={() => setIsLoading(false)}
//     />
//   </div>
//   <div className="flex flex-col">
//     <div className="flex items-center">
//       <Avatar AvtImageClassName="w-4 h-4" />
//       <p className="text-sm">{userName}</p>
//     </div>
//     <p className="w-full max-w-[230px] truncate text-ellipsis py-0.5 font-medium">{title}</p>
//     <div>
//       <p className="text-sm text-muted-foreground">{formattedDate}</p>
//     </div>
//     <p className="text-sm text-muted-foreground/90">{place}</p>
//   </div>
// </div>
