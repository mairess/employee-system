import { createSlice } from '@reduxjs/toolkit';
import listUsers from '../services/listUsers';
import { ApiResponseUserType } from '../types';

type UsersState = {
  data: ApiResponseUserType | null;
  loading: boolean;
  error: string | null
};

const initialState: UsersState = {
  data: null,
  loading: false,
  error: null,
};

const listUsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default listUsersSlice.reducer;
