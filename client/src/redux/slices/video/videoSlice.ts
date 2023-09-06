import { createSlice } from '@reduxjs/toolkit';
import type { VideoType } from '../../../types/videotypes';
import { getAllReportedVideosThunk, getAllSubVideoThunk, getSubVideoThunk } from './videoThunk';
import { reportThunk } from './watchThunk';

const initialState: VideoType[] = [];

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubVideoThunk.fulfilled, (state, action) => action.payload.reverse());
    builder.addCase(getAllSubVideoThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(reportThunk.fulfilled, (state, action) => {
      state.forEach((el) => {
        if (el.id === action.payload.videoId) {
          el.reports = action.payload;
          console.log('REPORT!!!!!!!!!!!!!', el);
        }
      });
    });
  },
});

export default videoSlice.reducer;
