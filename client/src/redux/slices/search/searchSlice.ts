import { createSlice } from '@reduxjs/toolkit';
import { addSearchThunk, searchThunk } from './searchThunk';
import { VideoType } from '../../../types/videotypes';

export type SearchState = {
  count: number;
  rows: VideoType[];
};

const initialState: SearchState = {
  count: 0,
  rows: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchThunk.fulfilled, (_, action) => action.payload);

    builder.addCase(
      addSearchThunk.fulfilled,
      (state, action) => (state = { ...state, rows: [...state.rows, ...action.payload.rows] }),
    );
  },
});

export default searchSlice.reducer;
