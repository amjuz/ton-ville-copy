import { configureStore } from '@reduxjs/toolkit'
import searchSlice from '@/store/features/search'
import profileSlice from '@/store/features/profile'

export const makeStore = () => {
  return configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
      search: searchSlice,
      profile: profileSlice,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
