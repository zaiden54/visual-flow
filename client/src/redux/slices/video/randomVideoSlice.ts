import { createSlice } from '@reduxjs/toolkit';
import type { ChannelType } from '../../../types/videotypes';
import { getSubVideoThunk, getRandomVideoThunk } from './videoThunk';

const initialState: ChannelType[] = [];

const randomVideoSlice = createSlice({
  name: 'random',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getRandomVideoThunk.fulfilled, (state, action) => action.payload);
  },
});

export default randomVideoSlice.reducer;