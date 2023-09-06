import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ChannelType } from '../../../types/videotypes';
import { deleteVideoThunk, getChannelThunk } from './channelThunk';

const initialState = {} as ChannelType;

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setVideos: (state, action: PayloadAction) => {
      state.Videos = action.payload.reverse();
      console.log(state.Videos);
    },
},
  extraReducers: (builder) => {
    builder.addCase(getChannelThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(deleteVideoThunk.fulfilled, (state, action) => ({...state, Videos: state.Videos.filter((video) => video.id !== action.payload.id) })); 
  },
}
);

export const { setVideos } = channelSlice.actions;

export default channelSlice.reducer;
