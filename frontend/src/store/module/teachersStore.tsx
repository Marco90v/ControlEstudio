import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState:teachersStore = {status:"", selectTeachers:0, data:[]};

export const fetchGetTeachers = createAsyncThunk('teachers/fetchGetTeachers', async (_,thunk) => {
  const response = await fetch('/api/v2/teachers', {
    signal: thunk.signal,
  })
  .then(r => r.json());
  return response;
});

export const fetchGetTeachersById = createAsyncThunk('teachers/fetchGetTeachersById', async (ID:number,thunk) => {
  const response = await fetch(`/api/v2/teachers/${ID}`, {
    signal: thunk.signal,
  })
  .then(r => r.json());
  return response;
});

export const fetchPostTeachers = createAsyncThunk('/teachers/fetchPostTeachers',async (dataTeacher:teacher[])=> {
  const newData = await fetch('/api/v1/teachers',{
    method:'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(dataTeacher)
  }).then(async (r)=>{
    const res = await r.json();
    return res.error ? res : dataTeacher;
  });
  return newData;
});

export const fetchDeleteTeacherByIdPerson = createAsyncThunk('/teachers/fetchDeleteTeacherByIdPerson', async (idPersons:number)=> {
  const newData = await fetch('/api/v1/teachers',{
    method:'DELETE',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({idPersons})
  }).then(async (r)=>{
    const res = await r.json();
    return res;
  });
  return newData;
});

export const fetchDeleteDataTeacherById = createAsyncThunk('/teachers/fetchDeleteDataTeacherById', async (ids:number[])=>{
  const newData = await fetch('/api/v2/teachers',{
    method:'DELETE',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(ids)
  }).then(async (r)=>{
    const res = await r.json();
    return {...res,ids};
  });
  return newData;
});

export const fetchUpdateDataTeachers = createAsyncThunk('/teachers/fetchUpdateDataTeachers', async (data:any)=>{
  const updateData = await fetch('/api/v2/teachers',{
    method:'PUT',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(async (r)=> data );
  return updateData;
});

export const teachersStore = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    changeStatus:(state,action:any) => {
      state.status = action.payload;
    },
    changeSelectTeacher:(state, action:any) =>{
      state.selectTeachers = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      // Recupera de Teachers
      .addCase(fetchGetTeachers.pending,(state,action)=>{
        state.status = 'adding';
      })
      .addCase(fetchGetTeachers.fulfilled,(state,action)=>{
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error;
        }else{
          state.status = "added";
          state.data = action.payload;
        }
      })
      .addCase(fetchGetTeachers.rejected,(state,action)=>{
        state.status = 'errorAdd';
      })

      // Recupera Teachers by id
      .addCase(fetchGetTeachersById.pending,(state,action)=>{
        state.status = 'adding';
      })
      .addCase(fetchGetTeachersById.fulfilled,(state,action)=>{
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error;
        }else{
          state.status = "added";
          state.data.unshift(action.payload);
        }
      })
      .addCase(fetchGetTeachersById.rejected,(state,action)=>{
        state.status = 'errorAdd';
      })

      // Agrega Teacher
      .addCase(fetchPostTeachers.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPostTeachers.fulfilled, (state, action) => {
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error;
        }else{
          state.status = "succeeded";
          state.data.unshift(...action.payload);
        }
      })
      .addCase(fetchPostTeachers.rejected, (state, action) => {
        state.status = action.meta.aborted ? '' : 'failed';
      })

      // Elimina Teachers by IdPersons
      .addCase(fetchDeleteTeacherByIdPerson.pending,(state,action)=>{
        state.status = 'deleting';
      })
      .addCase(fetchDeleteTeacherByIdPerson.fulfilled,(state,action)=>{
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error;
        }else{
          state.status = "removed";
          const {deleteId} = action.payload;
          state.data = state.data.filter(item=>item.IdPersons !== deleteId);
        }
      })
      .addCase(fetchDeleteTeacherByIdPerson.rejected,(state,action)=>{
        state.status = 'errorRemove';
      })

      // Elimina dataTeacher
      .addCase(fetchDeleteDataTeacherById.pending,(state,action)=>{
        state.status = 'deleting';
      })
      .addCase(fetchDeleteDataTeacherById.fulfilled,(state,action)=>{
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error;
        }else{
          state.status = "removed";
          const {ids} = action.payload;
          state.data = state.data.filter(item=>{
            var r:boolean = true;
            for (const key in ids) {
              if(item.id===ids[key]){
                r=false;
                break;
              }
            }
            return r;
          });
        }
      })
      .addCase(fetchDeleteDataTeacherById.rejected,(state,action)=>{
        state.status = 'errorRemove';
      })

      // Actualiza Teachers
      .addCase(fetchUpdateDataTeachers.pending,(state,action)=>{
        state.status = 'updating';
      })
      .addCase(fetchUpdateDataTeachers.fulfilled,(state,action)=>{
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error;
        }else{
          state.status = "updated";
          const newData:teacher = action.payload;
          state.data = state.data.map((item:teacher)=>item.id===newData.id ? newData : item);
        }
      })
      .addCase(fetchUpdateDataTeachers.rejected,(state,action)=>{
        state.status = 'errorUpdate';
      })
  }
})

// Action creators are generated for each case reducer function
export const { changeStatus, changeSelectTeacher } = teachersStore.actions

export default teachersStore.reducer