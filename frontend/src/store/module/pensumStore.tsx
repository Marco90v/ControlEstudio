import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// const initialState: pensumStore = {IdSemesters:0,Name_Semesters:"",classes:[]};
const initialState: pensumStore = {
    status:"",
    selectPensum:0,
    data:[]
};

export const fetchGetPensum = createAsyncThunk('pensum/fetchGetPensum', async (ID:number,thunk) => {
  const response = await fetch(`/api/v1/pensum/${ID}`, {
    signal: thunk.signal,
  })
  .then(r => r.json());
  return response
});

export const fetchPostClassePensum = createAsyncThunk('pensum/fetchPostClassesPensum', async (classe:any) => {
  // console.log(classe);
  const newData = await fetch('/api/v1/pensum',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(classe)
  }).then(async (r)=>{
    const res = await r.json();
    return res.error ? res : [{...classe[0], id:res.insertId}];
  });
  return newData;
});

export const fetchDeleteClassePensum = createAsyncThunk('pensum/fetchDeleteClassesPensum', async (id:any)=>{
  const deleteData = await fetch('/api/v1/pensum',{
    method:'DELETE',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(id)
  }).then(async (r)=>{
    const res = await r.json();
    return res;
  });
  return deleteData;
});

export const pensumStore = createSlice({
  name: 'pensum',
  initialState,
  reducers: {
    changeStatus:(state,action:any) => {
      state.status = action.payload;
    },
    changeSelectPensum:(state,action:any) => {
      state.selectPensum = action.payload;
    },
    insertSemester:(state,action)=>{
      state.data.push(action.payload);
      state.data.sort((a,b)=>a.IdSemesters-b.IdSemesters);
    },
  },
  extraReducers(builder) {
    builder
      // Recupera de clases o materias
      .addCase(fetchGetPensum.pending, (state, action) => {
            state.status = 'loading'
      })
      .addCase(fetchGetPensum.fulfilled, (state, action) => {
        if(action.payload.error){
        //   console.log(action.payload.error);
            state.status = action.payload.error
        }else{
            state.status = "succeeded"
            state.data = action.payload;
            // console.log(action.payload)
        }
      })
      .addCase(fetchGetPensum.rejected, (state, action) => {
            state.status = action.meta.aborted ? '' : 'failed';
      })

      // Agrega clases o materias
      .addCase(fetchPostClassePensum.pending,(state,action)=>{
        state.status = 'adding'
      })
      .addCase(fetchPostClassePensum.fulfilled,(state,action)=>{
        if(action.payload.error){
          state.status = action.payload.error
        }else{
          const data = action.payload;
          state.status = "added"
          state.data.forEach(semestre=>{
            if(semestre.IdSemesters === data[0].IdSemesters){
              semestre.Classes.push({
                id:data[0].id,
                IdClasses:data[0].IdClasses,
                Name_Classes:data[0].Name_Classes
              });
            }
          });
        }
      })
      .addCase(fetchPostClassePensum.rejected,(state,action)=>{
        state.status = 'errorAdd'
      })

      // Elimina clases o materias
      .addCase(fetchDeleteClassePensum.pending,(state,action)=>{
        state.status = 'deleting'
      })
      .addCase(fetchDeleteClassePensum.fulfilled,(state,action)=>{
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error
        }else{
          state.status = "removed"
          const {deleteId} = action.payload;
          
          state.data.forEach(semestre=>{
            semestre.Classes = semestre.Classes.filter(classe=>classe.id !== deleteId);
          })
        }
      })
      .addCase(fetchDeleteClassePensum.rejected,(state,action)=>{
        state.status = 'errorRemove'
      })
  }
})

// Action creators are generated for each case reducer function
export const { changeStatus, changeSelectPensum, insertSemester } = pensumStore.actions

export default pensumStore.reducer