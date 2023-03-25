import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState:rolesStore = {status:"", selectRole:0, data:[]};

export const fetchRoles = createAsyncThunk('role/fetchRoles', async (_,thunk) => {
  const response = await fetch('/api/v1/roles', {
    signal: thunk.signal,
  })
  .then(r => r.json());
  return response
});

export const rolesStore = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    changeStatus:(state,action:any) => {
      state.status = action.payload;
    },
    changeSelectRole:(state, action:any) => {
      state.selectRole = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // Recupera de clases o materias
      .addCase(fetchRoles.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        if(action.payload.error){
          console.log(action.payload.error);
          state.status = action.payload.error;
        }else{
          state.status = "succeeded";
          state.data = action.payload;
        }
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = action.meta.aborted ? '' : 'failed';
      })

  }
})

// Action creators are generated for each case reducer function
export const { changeStatus, changeSelectRole } = rolesStore.actions

export default rolesStore.reducer