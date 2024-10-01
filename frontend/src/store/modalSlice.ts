import { createSlice } from '@reduxjs/toolkit';

type ModalPasswordChangeState = {
  isModalOpen: boolean;
};

const initialState: ModalPasswordChangeState = {
  isModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modalPasswordChange',
  initialState,
  reducers: {
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
