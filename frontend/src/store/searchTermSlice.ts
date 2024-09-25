import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchTermState = {
  term: string;
};

const initialState: SearchTermState = {
  term: '',
};

const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.term = action.payload;
    },
  },
});

export const { setSearchTerm } = searchTermSlice.actions;
export default searchTermSlice.reducer;
