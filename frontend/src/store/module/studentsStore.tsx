import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState:studentsStore = {status:"", selectStudents:0, data:[]};

export const fetchGetStudents = createAsyncThunk('students/fetchStudents', async (_,thunk) => {
  const response = await fetch('/api/v2/students', {
    signal: thunk.signal,
  })
  .then(r => r.json());
  return response
});

export const fetchPostStudent = createAsyncThunk('/students/fetchPostStudent',async (dataStudent:students)=> {
    const newData = await fetch('/api/v1/students',{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(dataStudent)
    }).then(async (r)=>{
      const res = await r.json();
      return res.error ? res : dataStudent;
    });
    return newData;
});

export const fetchUpdateDataStudent = createAsyncThunk('/students/fetchUpdateDataStudent', async (data:any)=>{
    const updateData = await fetch('/api/v2/students',{
      method:'PUT',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(async (r)=> data );
    return updateData;
});

export const fetchDeleteDataStudentById = createAsyncThunk('/students/fetchDeleteDataStudentById', async (id:number)=>{
    const newData = await fetch('/api/v2/students',{
      method:'DELETE',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({id})
    }).then(async (r)=>{
      const res = await r.json();
      return {...res,id};
    });
    return newData;
});

export const studentsStore = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    changeStatus:(state,action:any) => {
      state.status = action.payload;
    },
    changeSelectStudents:(state, action:any) => {
      state.selectStudents = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // Recupera Estudiantes
      .addCase(fetchGetStudents.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchGetStudents.fulfilled, (state, action) => {
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error;
        }else{
          state.status = "succeeded";
          state.data = action.payload;
        }
      })
      .addCase(fetchGetStudents.rejected, (state, action) => {
        state.status = action.meta.aborted ? '' : 'failed';
      })

      // Agrega Estudiante
      .addCase(fetchPostStudent.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPostStudent.fulfilled, (state, action) => {
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error;
        }else{
          state.status = "succeeded";
        //   console.log(action.payload);
          state.data.unshift(action.payload);
        }
      })
      .addCase(fetchPostStudent.rejected, (state, action) => {
        state.status = action.meta.aborted ? '' : 'failed';
      })

       // Actualiza Estudiante
       .addCase(fetchUpdateDataStudent.pending,(state,action)=>{
        state.status = 'updating';
      })
      .addCase(fetchUpdateDataStudent.fulfilled,(state,action)=>{
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error;
        }else{
          state.status = "updated";
          const newData:teacher = action.payload;
          state.data = state.data.map((item:students)=>item.id===newData.id ? newData : item);
        }
      })
      .addCase(fetchUpdateDataStudent.rejected,(state,action)=>{
        state.status = 'errorUpdate';
      })

      // Elimina Student
      .addCase(fetchDeleteDataStudentById.pending,(state,action)=>{
        state.status = 'deleting';
      })
      .addCase(fetchDeleteDataStudentById.fulfilled,(state,action)=>{
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error;
        }else{
          state.status = "removed";
          const {id} = action.payload;
          state.data = state.data.filter(item=>{
            return item.id === id ? false : true
          });
        }
      })
      .addCase(fetchDeleteDataStudentById.rejected,(state,action)=>{
        state.status = 'errorRemove';
      })

  }
})

// Action creators are generated for each case reducer function
export const { changeStatus, changeSelectStudents } = studentsStore.actions

export default studentsStore.reducer