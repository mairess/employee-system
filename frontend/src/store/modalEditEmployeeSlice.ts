/* eslint-disable max-len */

import { createSlice } from '@reduxjs/toolkit';

type ModalEditEmployeeState = {
  isModalOpenEditEmployee: boolean;
};

const initialState: ModalEditEmployeeState = {
  isModalOpenEditEmployee: false,
};

const modalEditEmployeeSlice = createSlice({
  name: 'modalEditEmployee',
  initialState,
  reducers: {
    openModalEditEmployee(state) {
      state.isModalOpenEditEmployee = true;
    },
    closeModalEditEmployee(state) {
      state.isModalOpenEditEmployee = false;
    },
  },
});

export const { openModalEditEmployee, closeModalEditEmployee } = modalEditEmployeeSlice.actions;
export default modalEditEmployeeSlice.reducer;
