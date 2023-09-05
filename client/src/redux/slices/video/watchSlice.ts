import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { VideoPageType, VideoType, WatchChannelType, WatchType } from '../../../types/videotypes';
import getWatchThunk from './watchThunk';
// import { commentCreate } from './commentSlice';
import createCommentThunk from './commentThunk';


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
    builder.addCase(createCommentThunk.fulfilled, (state, action) => {
      // console.log(action.payload);
      return {...state, Comments: action.payload};
    })
  },
});

export default watchSlice.reducer;

// export const { setCurrentVideo } = watchSlice.actions;
