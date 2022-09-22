import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

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
});

export const fetchPostClasses = createAsyncThunk('/classes/fetchPostClasses',async (name:any)=> {
  const newData = await fetch('/api/v1/classes',{
    method:'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(name)
  }).then(async (r)=>{
    const res = await r.json();
    // console.log(res);
    // dispatch(add({id:res.insertId, names:name.names}));
    return {id:res.insertId, names:name.names}
  });
  return newData;
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
      const newData = action.payload;
      state.data.push(newData);
    },
    remove: (state,action:any) => {
      const id = action.payload;
      state.data = state.data.filter((item:data) => item.id !== id);
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

      .addCase(fetchPostClasses.pending,(state,action)=>{
        state.status = 'adding'
      })
      .addCase(fetchPostClasses.fulfilled,(state,action)=>{
        state.status = "added"
        console.log(action.payload);
        state.data.push(action.payload);
      })
      .addCase(fetchPostClasses.rejected,(state,action)=>{
        state.status = 'errorAdd'
      })
  }
})

// Action creators are generated for each case reducer function
export const { add, remove } = classesStore.actions

export default classesStore.reducer