/* eslint-disable max-len */
import { createSlice } from '@reduxjs/toolkit';

type ModalPasswordChangeState = {
  isModalPasswordChangeOpen: boolean;
};

const initialState: ModalPasswordChangeState = {
  isModalPasswordChangeOpen: false,
};

const modalPasswordChangeSlice = createSlice({
  name: 'modalPasswordChange',
  initialState,
  reducers: {
    openModalPasswordChange(state) {
      state.isModalPasswordChangeOpen = true;
    },
    closeModalPasswordChange(state) {
      state.isModalPasswordChangeOpen = false;
    },
  },
});

export const { openModalPasswordChange, closeModalPasswordChange } = modalPasswordChangeSlice.actions;
export default modalPasswordChangeSlice.reducer;
