import { createSlice } from '@reduxjs/toolkit'

type profile = {
  id:number,
  names: string,
  lastNames: string,
  sex: string,
  email: string,
  phone: number,
  role: number,
}

const base: profile = {
  id:0,
  names: '',
  lastNames: '',
  sex: '',
  email: '',
  phone: 0,
  role: 0,
};

const setLocalStorage = (p:profile) => {
  localStorage.setItem('profile',JSON.stringify(p));
}

const getLocalStorage = ():profile => {
  const p = localStorage.getItem('profile');
  return p ? JSON.parse(p) : null;
}

const initialState = getLocalStorage() || base;

export const profileStore = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile:(state,action:any)=>{
    //   console.log(action.payload);
      setLocalStorage(action.payload);
      const {id, names,lastNames,sex,email,phone,role} = action.payload;
      state.id = id;
      state.names = names;
      state.lastNames = lastNames;
      state.sex = sex;
      state.email = email;
      state.phone = phone;
      state.role = role;
    },
    removeProfile:(state)=>{
      const {id, names,lastNames,sex,email,phone,role} = initialState
      state.id = id;
      state.names = names;
      state.lastNames = lastNames;
      state.sex = sex;
      state.email = email;
      state.phone = phone;
      state.role = role;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setProfile, removeProfile } = profileStore.actions

export default profileStore.reducer