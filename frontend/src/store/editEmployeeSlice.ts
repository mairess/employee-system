/* eslint-disable max-len */
import { createSlice } from '@reduxjs/toolkit';
import { EmployeeType } from '../types';
import editEmployee from '../services/editEmployee';

type EditEmployeeState = {
  employee: EmployeeType;
  selectedEmployee: EmployeeType | null;
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

const initialState: EditEmployeeState = {
  employee: initialEmployee,
  selectedEmployee: null,
  loading: false,
  error: null,
};

const editEmployeeSlice = createSlice({
  name: 'editEmployee',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetEmployee: (state) => {
      state.employee = initialEmployee;
    },
    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(editEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, resetEmployee, setSelectedEmployee, clearSelectedEmployee } = editEmployeeSlice.actions;
export default editEmployeeSlice.reducer;
