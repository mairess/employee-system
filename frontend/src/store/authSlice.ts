import { createSlice } from '@reduxjs/toolkit';
import auth from '../services/auth';

type AuthState = {
  token: string | null;
  loading: boolean;
  error: string | null
};

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
      }
    },

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(auth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(auth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
