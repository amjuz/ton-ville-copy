import Image, { StaticImageData } from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { TruncateText } from '@test/utils/utils'
import { cn } from '@/lib/utils/cn'
import { Skeleton } from '@/components/ui/skeleton'
import { useParams } from 'next/navigation'

interface IQuestCard {
  title: string
  description: string
  imageSrc: StaticImageData | string
  imageAlt: string
  author: string
  className?: string
  questId:string
}

export default function QuestCard({
  title,
  description,
  imageAlt,
  imageSrc,
  author,
  className,
  questId
}: IQuestCard) {
  const [isLoading, setIsLoading] = useState(true)
  const truncatedTitle = title.length > 24 ? `${title.slice(0, 24)}...` : title

  const { tribeId } = useParams()

  return (
    <motion.div
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className={cn(
        'relative h-[280px] w-full max-w-[240px] flex-shrink-0 overflow-hidden rounded-2xl border border-muted bg-card shadow-sm transition-all hover:shadow-md',
        className
      )}
    >
      <Link
        className="absolute inset-0 z-10"
        href={`/protected/core/tribe/${tribeId}/quest/${questId}`}
        aria-label={title}
      />

      <div className="flex h-full flex-col">
        <div className="relative h-[160px] w-full overflow-hidden">
          {isLoading && (
            <Skeleton className="absolute inset-0 h-full w-full rounded-t-2xl bg-muted/60" />
          )}
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/30 to-transparent" />
          <Image
            src={imageSrc}
            height={480}
            width={720}
            alt={imageAlt}
            className={cn(
              'h-full w-full object-cover transition-all duration-500',
              isLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'
            )}
            onLoadingComplete={() => setIsLoading(false)}
          />
          <div className="absolute bottom-2 right-2 z-[2]">
            <span className="inline-flex items-center rounded-full bg-primary/90 px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
              New Quest
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1 p-3">
          <h3 className="line-clamp-1 font-medium leading-tight text-foreground">
            {truncatedTitle}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>

          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                </svg>
              </div>
              <span className="text-xs text-muted-foreground">By {author}</span>
            </div>
            <div className="rounded-full bg-secondary px-2 py-0.5">
              <span className="text-xs text-secondary-foreground">Explore</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
