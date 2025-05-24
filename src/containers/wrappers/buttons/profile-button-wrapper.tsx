import { EllipsisVertical } from 'lucide-react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'

export default function ProfileButtonWrapper({ userId }: { userId: string }) {
  // make each button individual components
  // get user here.
  return (
    <div className="mt-8 flex gap-2 px-2 sm:px-6">
      <Link
        //@TODO REPLACE WITH THE USER ID.
        href={`/protected/core/profile/${userId}/edit2`}
        className={buttonVariants({
          className: 'basis-full rounded-xl',
        })}
      >
        Edit Profile
      </Link>
      {/* <Button variant={'secondary'} className="basis-full rounded-xl">
        Share
      </Button> */}
      {/* <Button size={'icon'} variant={'secondary'} className="basis-32 rounded-xl bg-secondary/70">
        <EllipsisVertical size={20} />{' '}
      </Button> */}
    </div>
  )
}
