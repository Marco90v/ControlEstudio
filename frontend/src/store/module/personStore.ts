import { createSlice } from '@reduxjs/toolkit'

const initialDataPerson:person = {
    id:0,
    idPerson:0,
    names: "",
    lastNames: "",
    sex: "",
    email: "",
    phone: 0,
    photo: "",
    role: 0
};

const initialState: {data:person} = {data:initialDataPerson};

export const personStore = createSlice({
  name: 'person',
  initialState,
  reducers: {
    setPerson:(state,action)=>{
      state.data = {...action.payload};
    },
    resetPerson:(state)=>{
        state.data = {...initialDataPerson}
    },
    changePerson:(state, action)=> {
        const camp = Object.keys(action.payload)[0];
        const value = action.payload[camp];
        state.data = {...state.data, [camp]:value};
    }
  }
})

// Action creators are generated for each case reducer function
export const { setPerson, resetPerson,changePerson } = personStore.actions

export default personStore.reducer