import { createSlice } from '@reduxjs/toolkit';
import type { ChannelType } from '../../../types/videotypes';
import { getChannelThunk } from './channelThunk';

const initialState = {} as ChannelType;

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChannelThunk.fulfilled, (state, action) => action.payload);
  },
});

export default channelSlice.reducer;
