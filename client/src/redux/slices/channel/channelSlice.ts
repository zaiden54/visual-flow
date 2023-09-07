import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ChannelType } from '../../../types/videotypes';
import { deleteVideoThunk, getChannelThunk } from './channelThunk';
import { updateVideoThunk } from '../video/videoThunk';

const initialState = {} as ChannelType;

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setVideos: (state, action: PayloadAction) => {
      state.Videos = action.payload.reverse();
      console.log(state.Videos);
    },
    afterDeleteVideos: (state, action: PayloadAction) => {
      state.Videos = action.payload
  },
},
  extraReducers: (builder) => {
    builder.addCase(getChannelThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(deleteVideoThunk.fulfilled, (state, action) => { state.Videos.filter((el) => el.id !== action.payload.filter((elem) => elem.id === el.id))});
    builder.addCase(updateVideoThunk.fulfilled, (state, action) => ( {...state, Videos: state.Videos.map(el => {
      if (el.id === action.payload.id) {
        return action.payload
      }
      return el
    })} ) )
  },
}
);

export const { setVideos, afterDeleteVideos } = channelSlice.actions;

export default channelSlice.reducer;
