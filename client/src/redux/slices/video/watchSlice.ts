import { createSlice } from '@reduxjs/toolkit';
import type { VideoPageType } from '../../../types/videotypes';
import { getWatchThunk, setLikeThunk } from './watchThunk';

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
    builder.addCase(setLikeThunk.fulfilled, (state, action) => 
    {
      if (state?.Likes.findIndex((el) => el.id === action.payload.id) >= 0) {
      state.Likes = state.Likes.filter((el) => el.id!==action.payload.id)
    } else state?.Likes.push(action.payload)
    }
)},
});

export default watchSlice.reducer;

// export const { setCurrentVideo } = watchSlice.actions;
