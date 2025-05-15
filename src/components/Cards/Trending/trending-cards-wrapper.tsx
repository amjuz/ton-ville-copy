import TrendingCardList from './TrendingCardList'
import { fetchTrendingCards, TFetchTrendingCards } from '@/functions'

type TTrendingCardsWrapper = {
  orientation?: 'vertical' | 'horizontal'
}

export default async function TrendingCardsWrapper({ orientation }: TTrendingCardsWrapper) {
  const initialData: TFetchTrendingCards = await fetchTrendingCards({ limit: 5 })
  return <TrendingCardList initialData={initialData} orientation={orientation} />
}
