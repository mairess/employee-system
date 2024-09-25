import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PaginationState = {
  pageSize: number;
  pageNumber: number;
};

const initialState: PaginationState = {
  pageSize: 20,
  pageNumber: 0,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    setPageNumber(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
  },
});

export const { setPageSize, setPageNumber } = paginationSlice.actions;
export default paginationSlice.reducer;
