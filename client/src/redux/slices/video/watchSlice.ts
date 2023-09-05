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
      console.log(action.payload);

      const ind = state?.Channel.Subscriptions.findIndex((el) => el.id === action.payload.id);
      console.log('INDEX', ind);
      if (ind >= 0) {
        state?.Channel.Subscriptions.splice(ind, 1);
      } else {
        state?.Channel.Subscriptions.push(action.payload);
      }

      
    });
  },
});

export default watchSlice.reducer;

// export const { setCurrentVideo } = watchSlice.actions;
