import { createSlice } from '@reduxjs/toolkit';
import type { ReportType } from '../../../types/videotypes';
import { getAllReportedVideosThunk } from './videoThunk';
import { deleteVideoThunk } from '../channel/channelThunk';

const initialState: ReportType[] = [];

const allRepSlice = createSlice({
  name: 'allReps',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllReportedVideosThunk.fulfilled, (_, action) => action.payload);

    builder.addCase(deleteVideoThunk.fulfilled, (state, action) =>
      state.filter((report) => report.videoId !== action.payload.id),
    );
  },
});

export default allRepSlice.reducer;
