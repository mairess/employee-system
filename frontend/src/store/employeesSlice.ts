import { createSlice } from '@reduxjs/toolkit';
import listEmployees from '../services/listEmployees';
import { EmployeeType } from '../types';

type EmployeesState = {
  employees: EmployeeType[] | null;
  loading: boolean;
  error: string | null
};

const initialState: EmployeesState = {
  employees: null,
  loading: false,
  error: null,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listEmployees.fulfilled, (state, action) => {
        state.loading = true;
        state.employees = action.payload;
      })
      .addCase(listEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default employeesSlice.reducer;
