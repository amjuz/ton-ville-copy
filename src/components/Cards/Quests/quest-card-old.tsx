import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { TruncateText } from '@test/utils/utils'
import { cn } from '@/lib/utils/cn'

interface IQuestCard {
  title: string
  description: string
  imageSrc: StaticImageData | string
  imageAlt: string
  author?: string
  className?: string
}

export default function QuestCardOld({
  title,
  description,
  imageAlt,
  imageSrc,
  author = 'Ansen',
  className,
}: IQuestCard) {
  const truncatedTitle = TruncateText(title, 18)
  return (
    <div
      className={cn(
        'relative h-[250px] w-full max-w-[240px] flex-shrink-0 overflow-hidden',
        className
      )}
    >
      <Link
        className="absolute h-full w-full"
        href={`/protected/core/tribe/${author}/quest/${title.split(' ')[0]}`}
      />
      <div className="flex h-[247px] flex-col justify-between">
        <Image
          src={imageSrc}
          height={720}
          width={720}
          alt={imageAlt}
          className="flex-shrink-0 rounded-2xl object-cover"
        />
        <div className="">
          <p className="font-medium">{truncatedTitle}</p>
          <p className="line-clamp-2 h-[70px] text-ellipsis text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  )
}
