/* eslint-disable max-len */

import { createSlice } from '@reduxjs/toolkit';

type ModalCreateEmployeeState = {
  isModalCreateEmployeeOpen: boolean;
};

const initialState: ModalCreateEmployeeState = {
  isModalCreateEmployeeOpen: false,
};

const modalCreateEmployeeSlice = createSlice({
  name: 'modalCreateEmployee',
  initialState,
  reducers: {
    openModalCreateEmployee(state) {
      state.isModalCreateEmployeeOpen = true;
    },
    closeModalCreateEmployee(state) {
      state.isModalCreateEmployeeOpen = false;
    },
  },
});

export const { openModalCreateEmployee, closeModalCreateEmployee } = modalCreateEmployeeSlice.actions;
export default modalCreateEmployeeSlice.reducer;
