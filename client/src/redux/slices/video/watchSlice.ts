import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type {
  VideoPageType,
  VideoType,
  WatchChannelType,
  WatchType,
} from '../../../types/videotypes';
import getWatchThunk from './watchThunk';
import { addSubThunk } from '../subs/subThunk';

const initialState: VideoPageType = null;

const watchSlice = createSlice({
  name: 'currentVideo',
  initialState: initialState as VideoPageType,
  reducers: {
    // setCurrentVideo(state, action: PayloadAction<WatchType>) {
    //   // console.log(action.payload);
    //   return action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(getWatchThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(addSubThunk.fulfilled, (state, action) => {
      if (typeof (action.payload === 'object')) {
        state?.Channel.Subscriptions.push(action.payload);
      }
      return state;
    });
  },
});

export default watchSlice.reducer;

// export const { setCurrentVideo } = watchSlice.actions;
