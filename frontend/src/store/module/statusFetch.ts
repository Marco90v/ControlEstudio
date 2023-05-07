import { createSlice } from '@reduxjs/toolkit'

type initialData = {
    data:boolean
}

const initialState:initialData = {data:false};

export const statusFetch = createSlice({
  name: 'stateFetch',
  initialState,
  reducers: {
    setStateFetch:(state,action)=>{
        state.data = action.payload;
    },
    resetStateFetch:(state)=>{
        state.data = initialState.data;
    },
  }
})

// Action creators are generated for each case reducer function
export const { setStateFetch, resetStateFetch } = statusFetch.actions

export default statusFetch.reducer