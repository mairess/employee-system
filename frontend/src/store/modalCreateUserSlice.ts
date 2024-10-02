/* eslint-disable max-len */

import { createSlice } from '@reduxjs/toolkit';

type ModalCreateUserState = {
  isModalCreateUserOpen: boolean;
};

const initialState: ModalCreateUserState = {
  isModalCreateUserOpen: false,
};

const modalCreateUserSlice = createSlice({
  name: 'modalCreateUser',
  initialState,
  reducers: {
    openModalCreateUser(state) {
      state.isModalCreateUserOpen = true;
    },
    closeModalCreateUser(state) {
      state.isModalCreateUserOpen = false;
    },
  },
});

export const { openModalCreateUser, closeModalCreateUser } = modalCreateUserSlice.actions;
export default modalCreateUserSlice.reducer;
