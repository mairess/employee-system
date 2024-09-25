import { createSlice } from '@reduxjs/toolkit';
import findAllUsers from '../services/findAllUsers';
import { ApiResponseUserType } from '../types';

type FindAllUsersState = {
  data: ApiResponseUserType | null;
  loading: boolean;
  error: string | null
};

const initialState: FindAllUsersState = {
  data: null,
  loading: false,
  error: null,
};

const findAllUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(findAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default findAllUsersSlice.reducer;
