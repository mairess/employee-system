import { createSlice } from '@reduxjs/toolkit';
import passwordChange from '../services/passwordChange';

type PasswordChangeState = {
  message: string | null;
  loading: boolean;
  error: string | null
};

const initialState: PasswordChangeState = {
  message: null,
  loading: false,
  error: null,
};

const passwordChangeSlice = createSlice({
  name: 'passwordChange',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(passwordChange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(passwordChange.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(passwordChange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = passwordChangeSlice.actions;
export default passwordChangeSlice.reducer;
