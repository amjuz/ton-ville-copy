import { EllipsisVertical } from 'lucide-react'
import Image from 'next/image'
import MiniCardPlaceHolderImage from '@/assets/images/mock/devCon-Bangkok_mock.jpeg'
import Avatar from '@/components/Elements/avatar'
import CustomUnorderedList from '@/components/Elements/custom-unordered-list'
import { Button } from '@/components/ui/button'

const items = [
  'Retweet and Like the tweet in the link below from your twitter account.',
  'Welcome to the Largest Prize Pool Game! We have created a few simple tasks for participating in the pool.',
  'Retweet and Like the tweet in the link below from your twitter account.',
  'Welcome to the Largest Prize Pool Game! We have created a few simple tasks for participating in the pool.',
  'Retweet and Like the tweet in the link below from your twitter account.',
]

const names = ['Moneybunny', 'Ashlyn', 'Ho min asdas asda']
const count = 325
export default function EventPageWrapper() {
  /**
   * fetch data here
   *  so the suspense can work
   */
  return (
    <div className="mt-4 p-2 pb-12 sm:p-4">
      <Image
        {...MiniCardPlaceHolderImage}
        alt="hello"
        className="aspect-square rounded-2xl border-2 object-cover"
      />
      <div className="mt-5 pl-1">
        <p className="text-sm text-muted-foreground">Technology</p>
        <h1 className="max-w-prose text-pretty text-2xl font-bold">
          Quillcon Bangkok CXO Brunch in Yard
        </h1>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <div className="h-full max-h-14 w-full max-w-12 pl-1">
          <div className="grid w-full place-items-center overflow-hidden rounded-md bg-muted text-center">
            <div className="w-full bg-muted-foreground/20 text-sm text-muted-foreground">Nov</div>
            <div className="w-full py-0.5 text-sm font-bold">18</div>
          </div>
        </div>
        <div className="text-sm">
          <p className="text-muted-foreground">Wednesday, 3.00 - 9.00 pm</p>
          <p className="font-medium">City convention centre, Bangkok, Thailand</p>
        </div>
      </div>
      {/* <p className="mt-2">Unlock crypto wisdom and stand to win 25 USDT each week by 3 simple steps!</p> */}
      <div></div>
      <div className="mt-8 flex gap-2">
        <Button size={'lg'} className="basis-full rounded-xl">
          Join
        </Button>
        <Button size={'lg'} variant={'secondary'} className="basis-full rounded-xl">
          Enquire
        </Button>
        <Button size={'icon'} variant={'secondary'} className="basis-32 rounded-xl bg-secondary/70">
          <EllipsisVertical size={20} />{' '}
        </Button>
      </div>
      <div className="mt-4 flex items-center gap-3 text-sm">
        <div className="flex items-center pl-2">
          <div className="">
            <Avatar AvtImageClassName="w-8 h-8" />
          </div>
          <div className="relative z-[3] -ml-2 rounded-full border border-black">
            <Avatar AvtImageClassName="w-8 h-8" />
          </div>
          <div className="relative z-[4] -ml-2 rounded-full border border-black">
            <Avatar AvtImageClassName="w-8 h-8" />
          </div>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <p className="max-w-[180px] truncate text-ellipsis sm:max-w-[250px]">
            {names.join(', ')}
          </p>
          <p>{count}+</p>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-lg font-bold">About the event</p>
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">
            Join us at Bangkok Blockchain Week for an insightful workshop as part of the ICP
            Chainfusion Hackathon, hosted by ICPTh. The session, Best Practices for Building
            Resilient Decentralized Applications, will guide developers through the essential
            strategies for creating secure, scalable, and resilient dApps. Learn how to identify
            common vulnerabilities, implement robust security measures, and ensure long-term
            reliability in your decentralized applications.
          </p>
          <div className="mt-2">
            <p className="text-lg font-bold">What to Expect</p>
            <div className="">
              <div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    ​Key insights on secure smart contract development.
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  <CustomUnorderedList items={items} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
