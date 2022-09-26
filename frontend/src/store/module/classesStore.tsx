import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type data = {
  id:number, names:string
}

type classesStore = {
  status:string,
  data:data[]
}

const initialState: classesStore = {status:"",data:[]};

export const fetchClasses = createAsyncThunk('classes/fetchClasses', async (_,thunk) => {
  const response = await fetch('/api/v1/classes', {
    signal: thunk.signal,
  }).then(r=>r.json());
  return response
});

export const fetchPostClasses = createAsyncThunk('/classes/fetchPostClasses',async (name:any)=> {
  const newData = await fetch('/api/v1/classes',{
    method:'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(name)
  }).then(async (r)=>{
    const res = await r.json();
    return {id:res.insertId, names:name.names}
  });
  return newData;
});

export const fetchDeleteClasses = createAsyncThunk('/classes/fetchDeleteClasses', async (id:any)=>{
  const deleteData = await fetch('/api/v1/classes',{
    method:'DELETE',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(id)
  }).then(async (r)=>{
    const res = await r.json();
    return res;
  });
  return deleteData;
});

export const classesStore = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    changeStatus:(state,action:any)=>{
      state.status = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      // Recupera de clases o materias
      .addCase(fetchClasses.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = action.meta.aborted ? '' : 'failed';
      })
      // Agrega clases o materias
      .addCase(fetchPostClasses.pending,(state,action)=>{
        state.status = 'adding'
      })
      .addCase(fetchPostClasses.fulfilled,(state,action)=>{
        state.status = "added"
        state.data.push(action.payload);
      })
      .addCase(fetchPostClasses.rejected,(state,action)=>{
        state.status = 'errorAdd'
      })
      // Elimina clases o materias
      .addCase(fetchDeleteClasses.pending,(state,action)=>{
        state.status = 'deleting'
      })
      .addCase(fetchDeleteClasses.fulfilled,(state,action)=>{
        state.status = "removed"
        const {deleteId} = action.payload;
        state.data = state.data.filter(item=>item.id !== deleteId);
      })
      .addCase(fetchDeleteClasses.rejected,(state,action)=>{
        state.status = 'errorRemove'
      })
  }
})

// Action creators are generated for each case reducer function
export const { changeStatus } = classesStore.actions

export default classesStore.reducer