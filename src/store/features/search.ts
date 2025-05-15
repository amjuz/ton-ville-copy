import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSearchTitleState } from '@/components/utils/mini-tablet-data'

export type TSearchState = {
  searchQuery: string | null
  searchType: TSearchTitleState
}

const searchSlice = createSlice({
  name: 'Search-slice',
  initialState: {
    searchQuery: null,
    searchType: 'Chiefs',
  } as TSearchState,
  reducers: {
    setInitialTitleQuery(state, action: PayloadAction<{ state: TSearchTitleState }>) {
      state.searchType = action.payload.state
    },
    setSearchQuery(state, action: PayloadAction<{ search: string }>) {
      state.searchQuery = action.payload.search
    },
    setSearchTitleQuery(state, action: PayloadAction<{ state: TSearchTitleState }>) {
      state.searchType = action.payload.state
    },
  },
})

export const { setSearchQuery, setSearchTitleQuery, setInitialTitleQuery } = searchSlice.actions
export default searchSlice.reducer
