import { SearchMiniTabletData, TSearchTitleState } from '@/components/utils/mini-tablet-data'
import ClientSearchWrapper from '../../../../containers/wrappers/search/client-wrapper'
type TSearchPage = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SearchPage({ searchParams }: TSearchPage) {
  const { type } = await searchParams
  const initialSearchState = ((): TSearchTitleState => {
    if (typeof type === 'string' && SearchMiniTabletData.some((item) => item.title === type)) {
      return type as TSearchTitleState
    }
    return 'Chiefs'
  })()

  return (
    <main className="mt-3 w-full px-2 pb-12">
      <ClientSearchWrapper initialSearchState={initialSearchState} />
    </main>
  )
}
