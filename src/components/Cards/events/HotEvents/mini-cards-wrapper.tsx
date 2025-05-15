import React from 'react'
import MiniCardList from './mini-card-list'
import { fetchMiniCardData, TFetchMiniCardData } from '@/functions'

export default async function MiniCardsWrapper() {
  /**
   * Add in Query here and maintain the stuff.
   */
  const data: TFetchMiniCardData = await fetchMiniCardData({ limit: 16 })

  // need to wrap this on client component and do future data fetching from the client
  return <MiniCardList initialData={data} />
}
