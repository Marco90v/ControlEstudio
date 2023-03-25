import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState:personStore = {status:"", selectPerson:0, data:[]};

export const fetchGetPersonByRole = createAsyncThunk('persons/fetchGetPersonByRole', async (role:number=0,thunk) => {
  const ruta = role === 0 ? '/api/v1/persons' : '/api/v1/persons/'+role;
  const response = await fetch(ruta, {
    signal: thunk.signal,
  })
  .then(r => r.json());
  return response
});

export const fetchPostPerson = createAsyncThunk('/persons/fetchPostPersons',async (dataPerson:person)=> {
  const newData = await fetch('/api/v1/persons',{
    method:'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(dataPerson)
  }).then(async (r)=>{
    const res = await r.json();
    return res.error ? res : {...dataPerson, id:res.insertId, idPerson:res.insertId}
  });
  return newData;
});

export const fetchUpdatePersonById = createAsyncThunk('/persons/fetchUpdatePersonById',async (dataPerson:person)=>{
  const newData = await fetch('/api/v1/persons',{
    method:'PUT',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(dataPerson)
  }).then(async (r)=>{
    const res = await r.json();
    return res.error ? res : dataPerson
  });
  return newData;
});

export const fetchDeletePersonById = createAsyncThunk('/persons/fetchDeletePersonById', async (idPerson:number)=> {
  const newData = await fetch('/api/v1/persons',{
    method:'DELETE',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({id:idPerson})
  }).then(async (r)=>{
    const res = await r.json();
    return res
  });
  return newData;
});

export const personStore = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    changeStatus:(state,action:any) => {
      state.status = action.payload;
    },
    changeSelectPerson:(state,action:any) => {
      state.selectPerson = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      // Agrega Persona
      .addCase(fetchPostPerson.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPostPerson.fulfilled, (state, action) => {
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error;
        }else{
          state.status = "succeeded";
          state.data.unshift(action.payload);
        }
      })
      .addCase(fetchPostPerson.rejected, (state, action) => {
        state.status = action.meta.aborted ? '' : 'failed';
      })

      // Recupera Persona
      .addCase(fetchGetPersonByRole.pending,(state,action)=>{
        state.status = 'adding';
      })
      .addCase(fetchGetPersonByRole.fulfilled,(state,action)=>{
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error;
        }else{
          state.status = "added";
          state.data = action.payload.reverse();
        }
      })
      .addCase(fetchGetPersonByRole.rejected,(state,action)=>{
        state.status = 'errorAdd';
      })

      // Actualizar Persona
      .addCase(fetchUpdatePersonById.pending,(state,action)=>{
        state.status = 'adding';
      })
      .addCase(fetchUpdatePersonById.fulfilled,(state,action)=>{
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error;
        }else{
          state.status = "added";
          state.data = state.data.map((item:person)=>{
            return item.id === action.payload.id ? action.payload : item;
          })
        }
      })
      .addCase(fetchUpdatePersonById.rejected,(state,action)=>{
        state.status = 'errorAdd';
      })

      // Elimina Persona
      .addCase(fetchDeletePersonById.pending,(state,action)=>{
        state.status = 'deleting';
      })
      .addCase(fetchDeletePersonById.fulfilled,(state,action)=>{
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error;
        }else{
          state.status = "removed";
          const {deleteId} = action.payload;
          state.data = state.data.filter(item=>item.id !== deleteId);
        }
      })
      .addCase(fetchDeletePersonById.rejected,(state,action)=>{
        state.status = 'errorRemove';
      })
  }
})

// Action creators are generated for each case reducer function
export const { changeStatus, changeSelectPerson } = personStore.actions

export default personStore.reducer