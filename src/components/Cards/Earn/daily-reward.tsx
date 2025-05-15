import Link from 'next/link'
import GemYellow from '@/components/Icons/GemYellow'
import { buttonVariants } from '@/components/ui/button'

export default function DailyRewardCard() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between py-4">
      <div>
        <h1 className="xs:text-xl text-lg font-bold">Daily Rewards!</h1>
      </div>
      <div className="relative flex w-full items-center justify-center gap-1">
        <div className="golden-radial-gradient blur-xsl absolute h-7 w-[40%] animate-pulse blur ease-in-out" />
        <div className="">
          <GemYellow className="xs:w-6 xs:h-6 h-5 w-5 sm:w-8" />
        </div>
        <div>
          <GemYellow className="xs:w-8 xs:h-8 h-7 w-7" />
        </div>
        <div>
          <GemYellow className="xs:w-6 xs:h-6 h-5 w-5" />
        </div>
      </div>
      <div className="w-full px-3">
        <Link
          href={'/protected/core/claim'}
          className={buttonVariants({
            className: 'w-full text-sm',
            size: 'sm',
          })}
        >
          Claim
        </Link>
      </div>
    </div>
  )
}
