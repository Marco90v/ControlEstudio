import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type data = {
  id:number, names:string
}

type classesStore = {
  status:string,
  data:data[]
}

const initialState: classesStore = {status:"",data:[]};

export const fetchGetProfession = createAsyncThunk('profession/fetchGetProfession', async (_,thunk) => {
  const response = await fetch('/api/v1/profession', {
    signal: thunk.signal,
  })
  .then(r => r.json());
  return response
});

export const fetchPostProfession = createAsyncThunk('/profession/fetchPostProfession',async (name:any)=> {
  const newData = await fetch('/api/v1/profession',{
    method:'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(name)
  }).then(async (r)=>{
    const res = await r.json();
    return res.error ? res : {id:res.insertId, names:name.names}
    // return {id:res.insertId, names:name.names}
  });
  return newData;
});

export const fetchDeleteProfession = createAsyncThunk('/profession/fetchDeleteProfession', async (id:any)=>{
  const deleteData = await fetch('/api/v1/profession',{
    method:'DELETE',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(id)
  }).then(async (r)=>{
    const res = await r.json();
    return res;
  });
  return deleteData;
});

export const fetchUpdateProfession = createAsyncThunk('/profession/fetchUpdateProfession', async (data:any)=>{
  const updateData = await fetch('/api/v1/profession',{
    method:'PUT',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(async (r)=>{
    const res = await r.json();
    return res;
  });
  return updateData;
});

export const professionStore = createSlice({
  name: 'profession',
  initialState,
  reducers: {
    changeStatus:(state,action:any)=>{
      state.status = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      // Recupera de clases o materias
      .addCase(fetchGetProfession.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchGetProfession.fulfilled, (state, action) => {
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error
        }else{
          state.status = "succeeded"
          state.data = action.payload.reverse();
        }
      })
      .addCase(fetchGetProfession.rejected, (state, action) => {
        state.status = action.meta.aborted ? '' : 'failed';
      })

      // Agrega clases o materias
      .addCase(fetchPostProfession.pending,(state,action)=>{
        state.status = 'adding'
      })
      .addCase(fetchPostProfession.fulfilled,(state,action)=>{
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error
        }else{
          state.status = "added"
          // state.data.push(action.payload);
          state.data.unshift(action.payload);
        }
      })
      .addCase(fetchPostProfession.rejected,(state,action)=>{
        state.status = 'errorAdd'
      })

      // Elimina clases o materias
      .addCase(fetchDeleteProfession.pending,(state,action)=>{
        state.status = 'deleting'
      })
      .addCase(fetchDeleteProfession.fulfilled,(state,action)=>{
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error
        }else{
          state.status = "removed"
          const {deleteId} = action.payload;
          state.data = state.data.filter(item=>item.id !== deleteId);
        }
      })
      .addCase(fetchDeleteProfession.rejected,(state,action)=>{
        state.status = 'errorRemove'
      })

      // Actualiza clases o materias
      .addCase(fetchUpdateProfession.pending,(state,action)=>{
        state.status = 'updating'
      })
      .addCase(fetchUpdateProfession.fulfilled,(state,action)=>{
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error
        }else{
          state.status = "updated"
          const newData = action.meta.arg;
          state.data = state.data.map((oldData:data) => oldData.id === newData.id ? newData : oldData )
        }
      })
      .addCase(fetchUpdateProfession.rejected,(state,action)=>{
        state.status = 'errorUpdate'
      })
  }
})

// Action creators are generated for each case reducer function
export const { changeStatus } = professionStore.actions

export default professionStore.reducer