import React from 'react'
import { Telegram } from '../Icons/Telegram'

type TTelegramIconTextTile = {
  title: string
}

export default function TelegramIconTextTile({ title }: TTelegramIconTextTile) {
  //need to make this accordingly to its action.
  return (
    <div className="w-full rounded-2xl border px-4 py-3">
      <div className="flex items-center gap-4">
        <div>
          <Telegram />
        </div>
        <div>
          <p className="text-[15px] font-semibold sm:text-base">{title}</p>
        </div>
      </div>
    </div>
  )
}
