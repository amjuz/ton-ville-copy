import Link from 'next/link'
import { ReactNode } from 'react'
import { UrlObject } from 'url'
import { cn } from '@/lib/utils/cn'

type TTitleLinkCombo = {
  title: string
  href?: UrlObject | __next_route_internal_types__.RouteImpl<string>
  replaceSeeAll?: string | false
  emoji: ReactNode
  titleClassName?: string
}
export default function TitleLinkCombo({
  href,
  titleClassName,
  replaceSeeAll,
  title,
  emoji,
}: TTitleLinkCombo) {
  return (
    <header className="flex w-full justify-between py-2">
      <div className="flex items-center gap-1">
        <h1 className={cn('text-xl font-bold', titleClassName)}>{title}</h1>
        <span>{emoji}</span>
      </div>
      {typeof replaceSeeAll !== 'boolean' && href ? (
        <Link href={href} className="text-blue-500">
          {replaceSeeAll ? replaceSeeAll : 'See all'}
        </Link>
      ) : null}
    </header>
  )
}
