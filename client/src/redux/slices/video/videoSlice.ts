import { createSlice } from '@reduxjs/toolkit';
import type { VideoType } from '../../../types/videotypes';
import { getSubVideoThunk, updateVideoThunk } from './videoThunk';

const initialState: VideoType[] = [];

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubVideoThunk.fulfilled, (state, action) => action.payload.reverse());
    builder.addCase(updateVideoThunk.fulfilled, (state, action) => action.payload);
  },
});

export default videoSlice.reducer;
