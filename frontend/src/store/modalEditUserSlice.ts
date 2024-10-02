/* eslint-disable max-len */

import { createSlice } from '@reduxjs/toolkit';

type ModalEditUserState = {
  isModalEditUserOpen: boolean;
};

const initialState: ModalEditUserState = {
  isModalEditUserOpen: false,
};

const modalEditUserSlice = createSlice({
  name: 'modalEditUser',
  initialState,
  reducers: {
    openModalEditUser(state) {
      state.isModalEditUserOpen = true;
    },
    closeModalEditUser(state) {
      state.isModalEditUserOpen = false;
    },
  },
});

export const { openModalEditUser, closeModalEditUser } = modalEditUserSlice.actions;
export default modalEditUserSlice.reducer;
