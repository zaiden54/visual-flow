import { createSlice } from '@reduxjs/toolkit';
import type { ReportType } from '../../../types/videotypes';
import { getAllReportedVideosThunk } from './videoThunk';

const initialState: ReportType[] = [];

const allRepSlice = createSlice({
  name: 'allReps',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllReportedVideosThunk.fulfilled, (state, action) => action.payload);
  },
});

export default allRepSlice.reducer;
