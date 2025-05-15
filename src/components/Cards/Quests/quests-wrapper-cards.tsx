import React from 'react'
import QueryCardList from './quest-card-list'
import { fetchQuestCards, TFetchQuestCards } from '@/functions'

type TQuestsWrapperCards = {
  className?: string
}

export default async function QuestsWrapperCards({}: TQuestsWrapperCards) {
  const data: TFetchQuestCards = await fetchQuestCards({ limit: 7 })
  return <QueryCardList initialData={data} />
}
