import { createSlice } from '@reduxjs/toolkit';

type ModalPasswordChangeState = {
  isModalOpen: boolean;
};

const initialState: ModalPasswordChangeState = {
  isModalOpen: false,
};

const modalPasswordChangeSlice = createSlice({
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

export const { openModal, closeModal } = modalPasswordChangeSlice.actions;
export default modalPasswordChangeSlice.reducer;
