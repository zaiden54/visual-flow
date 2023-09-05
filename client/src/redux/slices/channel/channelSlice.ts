import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { ChannelType } from '../../../types/videotypes';
import { addVideoChannelThunk, getChannelThunk } from './channelThunk';

const initialState = {} as ChannelType;

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setVideos: (state, action: PayloadAction) => {
      state.Videos = action.payload.reverse()
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChannelThunk.fulfilled, (state, action) => action.payload);
  },
});

export const { setVideos } = channelSlice.actions;

export default channelSlice.reducer;
