import { createSlice } from '@reduxjs/toolkit';
import type { VideoType } from '../../../types/videotypes';
import { getAllSubVideoThunk, getPopularVideosThunk, getSubVideoThunk } from './videoThunk';
import { reportThunk } from './watchThunk';

const initialState: VideoType[] = [];

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubVideoThunk.fulfilled, (_, action) => action.payload);
    builder.addCase(getAllSubVideoThunk.fulfilled, (_, action) => action.payload.reverse());
    builder.addCase(reportThunk.fulfilled, (state, action) => {
      state.forEach((el) => {
        if (el.id === action.payload.videoId) {
          el.reports = action.payload;
        }
      });
    });
    builder.addCase(getPopularVideosThunk.fulfilled, (_, action) => action.payload);
  },
});

export default videoSlice.reducer;
