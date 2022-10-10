import { createSlice } from '@reduxjs/toolkit'

const initialState: visibleSide = {status:true};

export const visibleSide = createSlice({
  name: 'visibleSide',
  initialState,
  reducers: {
    change: (state) => {
        state.status = !state.status
    }
  }
})

// Action creators are generated for each case reducer function
export const { change } = visibleSide.actions

export default visibleSide.reducer