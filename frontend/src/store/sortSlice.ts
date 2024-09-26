import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SortState = {
  column: string;
  direction: string
};

const initialState: SortState = {
  column: 'id',
  direction: 'asc',
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setColumn(state, action: PayloadAction<string>) {
      state.column = action.payload;
    },
    setDirection(state, action: PayloadAction<string>) {
      state.direction = action.payload;
    },
  },
});

export const { setColumn, setDirection } = sortSlice.actions;
export default sortSlice.reducer;
