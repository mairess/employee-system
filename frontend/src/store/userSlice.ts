import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../types';
import register from '../services/register';

type UserState = {
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

const initialState: UserState = {
  user: initialUser,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
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

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
