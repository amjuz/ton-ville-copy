import Image from 'next/image'
import { useState } from 'react'
import { Skeleton } from '../ui/skeleton'
import { cn } from '@/lib/utils/cn'

export default function TribePageCoverPhoto({ image }: { image: string }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <figure>
      {isLoading && <Skeleton className="inset-0 h-full w-full rounded-t-2xl bg-muted/60" />}
      <Image
        alt="Tribe background image"
        width={1920}
        height={1080}
        src={image}
        className={cn(
          'aspect-video object-cover transition-all duration-500',
          isLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'
        )}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </figure>
  )
}
