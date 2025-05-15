import React from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { setSearchQuery } from '@/store/features/search'

export default function SearchInput() {
  const { searchQuery: searchInput } = useAppSelector((state) => state.search)
  const dispatch = useAppDispatch()

  return (
    <input
      className="w-full rounded-full bg-muted py-2 indent-4"
      placeholder="Search eg: 'John.doe' 'ApeStar'"
      onChange={(e) => dispatch(setSearchQuery({ search: e.target.value }))}
      value={searchInput || ''}
      autoFocus
    />
  )
}
