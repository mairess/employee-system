import { createSlice } from '@reduxjs/toolkit';
import listEmployees from '../services/listEmployees';
import { ApiResponseEmployeeType } from '../types';

type EmployeesState = {
  data: ApiResponseEmployeeType | null;
  loading: boolean;
  error: string | null
};

const initialState: EmployeesState = {
  data: null,
  loading: false,
  error: null,
};

const listEmployeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(listEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = listEmployeesSlice.actions;
export default listEmployeesSlice.reducer;
