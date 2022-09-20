import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type data = {
  id:number, names:string
}

type classesStore = {
  status:string,
  data:data[]
}

const initialState: classesStore = {status:"",data:[]};

export const fetchClasses = createAsyncThunk('classes/fetchClasses', async () => {
  const response = await fetch('/api/v1/classes').then(r=>r.json());
  return response
})

export const classesStore = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    add: (state,action:any) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const {id,names}=action;
      state.data.push({id,names});
    },
    remove: (state,action:any) => {
      const {id}=action;
      state.data.filter((item:any)=>item.id !== id);
    },
    loadFetch:(state,action:any)=>{
      state = action;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchClasses.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = 'failed'
      })
  }
})

// Action creators are generated for each case reducer function
export const { add, remove, loadFetch } = classesStore.actions

export default classesStore.reducer