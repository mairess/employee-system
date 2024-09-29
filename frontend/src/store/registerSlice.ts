import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../types';
import register from '../services/register';

type RegisterState = {
  user: UserType;
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

const initialState: RegisterState = {
  user: initialUser,
  loading: false,
  error: null,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetUser: (state) => {
      state.user = initialUser;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, resetUser } = registerSlice.actions;
export default registerSlice.reducer;
