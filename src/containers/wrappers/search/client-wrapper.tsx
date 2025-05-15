'use client'
import { useRef } from 'react'
import SearchInput from '@/components/search/search-input'
import SearchMiniTablet from '@/components/tablets/search-mini-tablet'
import { ComponentMapper } from '@/components/utils/component-mapper'
import { TSearchTitleState } from '@/components/utils/mini-tablet-data'
import { useAppSelector, useAppStore } from '@/hooks/reduxHooks'
import { setInitialTitleQuery } from '@/store/features/search'

export default function ClientSearchWrapper({
  initialSearchState,
}: {
  initialSearchState: TSearchTitleState
}) {
  const store = useAppStore()
  const initialized = useRef(false)
  if (!initialized.current) {
    store.dispatch(setInitialTitleQuery({ state: initialSearchState }))
    initialized.current = true
  }
  const { searchQuery: searchInput, searchType } = useAppSelector((state) => state.search)

  return (
    <div className="w-full">
      <div className="">
        <SearchInput />
        <div className="scrollbar-hidden scrollbar-thumb-rounded scrollbar-track-primary scrollbar-thumb my-4 mt-4 flex w-full gap-2 overflow-x-scroll">
          <SearchMiniTablet />
        </div>
      </div>

      <div className="w-full">
        <p className="text-sm">
          {searchInput
            ? `Showing Results for ‘${searchInput}’ in '${searchType}'`
            : `Showing Trending Results for '${searchType}'`}{' '}
        </p>
        <div className="mt-4 flex w-full">{ComponentMapper[searchType]}</div>
      </div>
    </div>
  )
}
