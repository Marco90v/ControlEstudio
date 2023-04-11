import { createSlice } from '@reduxjs/toolkit'

type session = {
    token: string | null
}

const getLocalStorage = () => {
  return localStorage.getItem('token');
}

const initialState: session = {token:getLocalStorage()};

const setLocalStorage = (token:string) => {
  localStorage.setItem('token',token);
}

const removeLocalStorage = () => {
  localStorage.removeItem('token');
}

export const sessionStore = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession:(state,action:any)=>{
      // console.log(action.payload);
      setLocalStorage(action.payload.token);
      state.token = action.payload.token;
    },
    removeSession:(state)=>{
      removeLocalStorage();
      state.token = null;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setSession, removeSession } = sessionStore.actions

export default sessionStore.reducer