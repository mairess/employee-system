/* eslint-disable max-len */
import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../types';
import editUser from '../services/editUser';

type EditUserState = {
  user: UserType;
  selectedUser: UserType | null;
  loading: boolean;
  error: string | null
};

const initialUser = {
  id: null,
  photo: '',
  fullName: '',
  username: '',
  email: '',
  password: '',
  role: 'user',
};

const initialState: EditUserState = {
  user: initialUser,
  selectedUser: null,
  loading: false,
  error: null,
};

const editUserSlice = createSlice({
  name: 'editUser',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetUser: (state) => {
      state.user = initialUser;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUSer: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, resetUser, setSelectedUser, clearSelectedUSer } = editUserSlice.actions;
export default editUserSlice.reducer;
