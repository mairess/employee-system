import { createSlice } from '@reduxjs/toolkit';
import findLoggedUser from '../services/findLoggedUser';
import { UserType } from '../types';

type FindLoggedUserState = {
  user: UserType | null;
  loading: boolean;
  error: string | null
};

const initialState: FindLoggedUserState = {
  user: null,
  loading: false,
  error: null,
};

const findLoggedUserSlice = createSlice({
  name: 'findLoggedUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findLoggedUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findLoggedUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(findLoggedUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default findLoggedUserSlice.reducer;
