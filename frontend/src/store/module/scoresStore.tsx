import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState:scoresStore = {status:"", selectStudent:0, data:{classes:[], teacherByPS:[]}};

export const fetchClassesByProfessionAndSemesters = createAsyncThunk('scores/getClassesByProfessionAndSemesters', async (data:any,thunk) => {
  const ruta = '/api/v2/getClassesByProfessionAndSemesters';
  const response = await fetch(ruta, {
    method:'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then(r => r.json());
  return response
});

export const fetchTeachersByProfessionAndSemesters = createAsyncThunk('scores/getTeachersByProfessionAndSemesters', async (data:any,thunk) => {
  const ruta = '/api/v2/getTeachersByProfessionAndSemesters';
  const response = await fetch(ruta, {
    method:'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then(r => r.json());
  return response
});

export const scoreStore = createSlice({
  name: 'scores',
  initialState,
  reducers: {
    changeStatus:(state,action:any) => {
      state.status = action.payload;
    },
    changeSelectPerson:(state,action:any) => {
      state.selectStudent = action.payload;
    }
  },
  extraReducers(builder) {
    builder

      // Recupera Clases
      .addCase(fetchClassesByProfessionAndSemesters.pending,(state,action)=>{
        state.status = 'adding';
      })
      .addCase(fetchClassesByProfessionAndSemesters.fulfilled,(state,action)=>{
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error;
        }else{
          state.status = "added";
          // console.log(action.payload);
          state.data.classes = action.payload;
        }
      })
      .addCase(fetchClassesByProfessionAndSemesters.rejected,(state,action)=>{
        state.status = 'errorAdd';
      })

      // Recupera Proefesores
      .addCase(fetchTeachersByProfessionAndSemesters.pending,(state,action)=>{
        state.status = 'adding';
      })
      .addCase(fetchTeachersByProfessionAndSemesters.fulfilled,(state,action)=>{
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error;
        }else{
          state.status = "added";
          // console.log(action.payload);
          state.data.teacherByPS = action.payload;
        }
      })
      .addCase(fetchTeachersByProfessionAndSemesters.rejected,(state,action)=>{
        state.status = 'errorAdd';
      })

  }
})

// Action creators are generated for each case reducer function
export const { changeStatus, changeSelectPerson } = scoreStore.actions

export default scoreStore.reducer