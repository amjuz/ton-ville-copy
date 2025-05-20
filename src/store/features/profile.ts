import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ProfileState = {
  userId: string
  // setUserId: (id: string) => void
}
const profileSlice = createSlice({
  name: 'Profile-slice',
  initialState: { userId: '' } as ProfileState,
  reducers: {
    setUserId(state, action: PayloadAction<{ id: string }>) {
      state.userId = action.payload.id
    },
  },
})

export const { setUserId } = profileSlice.actions
export default profileSlice.reducer
