import Image from 'next/image'
import LeaderBoardFirst from '@/assets/images/mock/leader-board-1.jpeg'
import { Crown } from '@/components/Icons/Crown'
import { isProd } from '@test/utils/utils'

interface IPodiumCard {
  podiumUsers: {
    id: number
    userName: string
    rank: number
    gems: number
  }[]
}

export default function PodiumCard({ podiumUsers }: IPodiumCard) {
  if (podiumUsers.length > 4 && !isProd) throw new Error('Podium users should be of length 3')
  return (
    <div className="flex items-end justify-center gap-8">
      <div className="relative">
        <div className="mx-auto flex items-center justify-center">
          <Crown className="max-w-8" />
        </div>
        <div className="relative max-w-20 rounded-full border-2 border-blue-500">
          <Image
            alt="leaderboard-first-rank"
            className="rounded-full"
            src={LeaderBoardFirst.src}
            width={720}
            height={720}
          />
          <div className="absolute bottom-0 z-20 flex w-full items-center justify-center">
            <div className="relative top-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
              <p className="max-h-fit max-w-fit font-medium">{podiumUsers[1].rank}</p>
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-col items-center justify-center">
          <h1 className="font-semibold">{podiumUsers[1].userName}</h1>
          <p className="text-muted-foreground">{podiumUsers[1].gems}</p>
        </div>{' '}
      </div>
      <div className="relative">
        <div className="mx-auto flex items-center justify-center">
          <Crown className="max-w-12" />
        </div>
        <div className="relative max-w-28 rounded-full border-2 border-yellow-500">
          <Image
            alt="leaderboard-first-rank"
            className="rounded-full"
            src={LeaderBoardFirst.src}
            width={720}
            height={720}
          />
          <div className="absolute bottom-0 z-20 flex w-full items-center justify-center">
            <div className="relative top-3 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500">
              <p className="max-h-fit max-w-fit font-medium">{podiumUsers[0].rank}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center justify-center">
          <h1 className="font-semibold">{podiumUsers[0].userName}</h1>
          <p className="text-muted-foreground">{podiumUsers[0].gems}</p>
        </div>{' '}
      </div>
      <div className="relative">
        <div className="mx-auto flex items-center justify-center">
          <Crown className="max-w-8" />
        </div>
        <div className="relative max-w-20 rounded-full border-2 border-green-500">
          <Image
            className="rounded-full"
            alt="leaderboard-first-rank"
            src={LeaderBoardFirst.src}
            width={720}
            height={720}
          />
          <div className="absolute bottom-0 z-20 flex w-full items-center justify-center">
            <div className="relative top-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
              <p className="max-h-fit max-w-fit font-medium">{podiumUsers[2].rank}</p>
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-col items-center justify-center">
          <h1 className="font-semibold">{podiumUsers[2].userName}</h1>
          <p className="text-muted-foreground">{podiumUsers[2].gems}</p>
        </div>
      </div>
    </div>
  )
}
