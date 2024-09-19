import { createSlice } from '@reduxjs/toolkit';
import listUsers from '../services/listUsers';
import { UserType } from '../types';

type EmployeesState = {
  users: UserType[] | null;
  loading: boolean;
  error: string | null
};

const initialState: EmployeesState = {
  users: [],
  loading: false,
  error: null,
};

const listUsersSlice = createSlice({
  name: 'employees',
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
        state.users = action.payload;
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default listUsersSlice.reducer;
