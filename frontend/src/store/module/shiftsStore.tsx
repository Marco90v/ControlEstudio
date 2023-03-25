import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState:shiftsStore = {status:"", selectShift:0, data:[]};

export const fetchGetShifts = createAsyncThunk('shifts/fetchShifts', async (_,thunk) => {
  const response = await fetch('/api/v1/shifts', {
    signal: thunk.signal,
  })
  .then(r => r.json());
  return response
});

export const shiftsStore = createSlice({
  name: 'shifts',
  initialState,
  reducers: {
    changeStatus:(state,action:any) => {
      state.status = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      // Recupera de clases o materias
      .addCase(fetchGetShifts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchGetShifts.fulfilled, (state, action) => {
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error;
        }else{
          state.status = "succeeded";
          state.data = action.payload;
        }
      })
      .addCase(fetchGetShifts.rejected, (state, action) => {
        state.status = action.meta.aborted ? '' : 'failed';
      })
  }
})

// Action creators are generated for each case reducer function
export const { changeStatus } = shiftsStore.actions

export default shiftsStore.reducer