import { createSlice } from '@reduxjs/toolkit';
import type { ChannelType } from '../../../types/videotypes';
import getSubVideoThunk from './videoThunk';

const initialState: ChannelType[] = [];

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubVideoThunk.fulfilled, (state, action) => action.payload);
  },
});

export default videoSlice.reducer;
