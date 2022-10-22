import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState: classeStore = {status:"", selctClasses:0, data:[]};

export const fetchClasses = createAsyncThunk('classes/fetchClasses', async (_,thunk) => {
  const response = await fetch('/api/v1/classes', {
    signal: thunk.signal,
  })
  .then(r => r.json());
  return response
});

export const fetchPostClasses = createAsyncThunk('/classes/fetchPostClasses',async (name:any)=> {
  const newData = await fetch('/api/v1/classes',{
    method:'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(name)
  }).then(async (r)=>{
    const res = await r.json();
    return res.error ? res : {id:res.insertId, names:name.names}
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

export const fetchUpdateClasses = createAsyncThunk('/classes/fetchUpdateClasses', async (data:any)=>{
  const updateData = await fetch('/api/v1/classes',{
    method:'PUT',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(async (r)=>{
    const res = await r.json();
    return res;
  });
  return updateData;
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
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error
        }else{
          state.status = "succeeded"
          state.data = action.payload.reverse();
        }
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = action.meta.aborted ? '' : 'failed';
      })

      // Agrega clases o materias
      .addCase(fetchPostClasses.pending,(state,action)=>{
        state.status = 'adding'
      })
      .addCase(fetchPostClasses.fulfilled,(state,action)=>{
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error
        }else{
          state.status = "added"
          state.data.unshift(action.payload);
        }
      })
      .addCase(fetchPostClasses.rejected,(state,action)=>{
        state.status = 'errorAdd'
      })

      // Elimina clases o materias
      .addCase(fetchDeleteClasses.pending,(state,action)=>{
        state.status = 'deleting'
      })
      .addCase(fetchDeleteClasses.fulfilled,(state,action)=>{
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error
        }else{
          state.status = "removed"
          const {deleteId} = action.payload;
          state.data = state.data.filter(item=>item.id !== deleteId);
        }
      })
      .addCase(fetchDeleteClasses.rejected,(state,action)=>{
        state.status = 'errorRemove'
      })

      // Actualiza clases o materias
      .addCase(fetchUpdateClasses.pending,(state,action)=>{
        state.status = 'updating'
      })
      .addCase(fetchUpdateClasses.fulfilled,(state,action)=>{
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error
        }else{
          state.status = "updated"
          const newData = action.meta.arg;
          state.data = state.data.map((oldData:classe) => oldData.id === newData.id ? newData : oldData )
        }
      })
      .addCase(fetchUpdateClasses.rejected,(state,action)=>{
        state.status = 'errorUpdate'
      })
  }
})

// Action creators are generated for each case reducer function
export const { changeStatus } = classesStore.actions

export default classesStore.reducer