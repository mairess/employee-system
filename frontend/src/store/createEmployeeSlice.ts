import { createSlice } from '@reduxjs/toolkit';
import { EmployeeType } from '../types';
import createEmployee from '../services/createEmployee';

type CreateEmployeeState = {
  employee: EmployeeType;
  loading: boolean;
  error: string | null
};

const initialEmployee = {
  id: null,
  photo: '',
  fullName: '',
  position: '',
  admission: '',
  phone: '',
};

const initialState: CreateEmployeeState = {
  employee: initialEmployee,
  loading: false,
  error: null,
};

const createEmployeeSlice = createSlice({
  name: 'createEmployee',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = createEmployeeSlice.actions;
export default createEmployeeSlice.reducer;
