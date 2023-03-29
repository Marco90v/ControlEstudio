import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// const initialState: pensumStore = {IdSemesters:0,Name_Semesters:"",classes:[]};
const initialState: semestersStore = {
    status:"",
    selectSemester:0,
    data:[]
};

export const fetchGetSemesters = createAsyncThunk('semesters/fetchGetSemesters', async (_,thunk) => {
  const response = await fetch(`/api/v1/semesters`, {
    signal: thunk.signal,
  })
  .then(r => r.json());
  return response
});

export const semestersStore = createSlice({
  name: 'semesters',
  initialState,
  reducers: {
    changeStatus:(state,action:any)=>{
      state.status = action.payload;
    },
    changeSelectSemesters:(state,action:any) => {
        state.selectSemester = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      // Recupera de clases o materias
      .addCase(fetchGetSemesters.pending, (state, action) => {
            state.status = 'loading'
      })
      .addCase(fetchGetSemesters.fulfilled, (state, action) => {
        if(action.payload.error){
            state.status = action.payload.error
        }else{
            state.status = "succeeded"
            state.data = action.payload;
        }
      })
      .addCase(fetchGetSemesters.rejected, (state, action) => {
            state.status = action.meta.aborted ? '' : 'failed';
      })
  }
})

// Action creators are generated for each case reducer function
export const { changeStatus, changeSelectSemesters } = semestersStore.actions

export default semestersStore.reducer