import { createSlice } from '@reduxjs/toolkit';
import type { VideoType } from '../../../types/videotypes';
import { getRandomVideoThunk } from './videoThunk';

const initialState: VideoType[] = [];

const randomVideoSlice = createSlice({
  name: 'random',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRandomVideoThunk.fulfilled, (_, action) => action.payload);
  },
});

export default randomVideoSlice.reducer;
