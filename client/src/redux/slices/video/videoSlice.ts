import { createSlice } from '@reduxjs/toolkit';
import type { VideoType } from '../../../types/videotypes';
import { getSubVideoThunk } from './videoThunk';

const initialState: VideoType[] = [];

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubVideoThunk.fulfilled, (state, action) => action.payload.reverse());
  },
});

export default videoSlice.reducer;
