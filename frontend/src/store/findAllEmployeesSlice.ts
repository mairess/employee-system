import { createSlice } from '@reduxjs/toolkit';
import findAllEmployees from '../services/findAllEmployees';
import { ApiResponseEmployeeType } from '../types';

type FindAllEmployeesState = {
  data: ApiResponseEmployeeType | null;
  loading: boolean;
  error: string | null
};

const initialState: FindAllEmployeesState = {
  data: null,
  loading: false,
  error: null,
};

const findAllEmployeesSlice = createSlice({
  name: 'allEmployees',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findAllEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findAllEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(findAllEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = findAllEmployeesSlice.actions;
export default findAllEmployeesSlice.reducer;
