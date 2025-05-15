import { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import { CheckGreen } from '../Icons/CheckGreen'
import Gem from '../Icons/Gem'

type TTaskTiles = {
  title: string
  icon: ReactNode
  reward: string | number
  completed?: boolean
}

export default function TaskTiles({ title, icon, reward, completed }: TTaskTiles) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-2xl border-2 px-4 py-4">
      <div className="flex items-center gap-2">
        {icon}
        <div>
          <h1 className="text-base font-medium">{title}</h1>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div
          className={cn('flex items-center justify-center gap-2 px-2', {
            'rounded-2xl bg-sky-600': completed,
          })}
        >
          <p className="text-base font-medium">
            <span
              className={cn({
                hidden: !completed,
              })}
            >
              +
            </span>
            {reward}
          </p>
          <Gem className="h-5 w-5" />
          <div
            className={cn({
              hidden: completed,
            })}
          >
            <CheckGreen className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  )
}
