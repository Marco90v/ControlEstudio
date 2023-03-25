import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState:sectionsStore = {status:"", selectSection:0, data:[]};

export const fetchGetSections = createAsyncThunk('sections/fetchSections', async (_,thunk) => {
  const response = await fetch('/api/v1/sections', {
    signal: thunk.signal,
  })
  .then(r => r.json());
  return response
});

export const sectionsStore = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    changeStatus:(state,action:any) => {
      state.status = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      // Recupera de clases o materias
      .addCase(fetchGetSections.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchGetSections.fulfilled, (state, action) => {
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error;
        }else{
          state.status = "succeeded";
          state.data = action.payload;
        }
      })
      .addCase(fetchGetSections.rejected, (state, action) => {
        state.status = action.meta.aborted ? '' : 'failed';
      })

  }
})

// Action creators are generated for each case reducer function
export const { changeStatus } = sectionsStore.actions

export default sectionsStore.reducer