import { createSlice } from '@reduxjs/toolkit';
import { addSubThunk } from '../subs/subThunk';
import { getWatchThunk, reportThunk, setLikeThunk } from './watchThunk';
import type { VideoPageType } from '../../../types/videotypes';
import createCommentThunk from './commentThunk';

const initialState: VideoPageType = null;

const watchSlice = createSlice({
  name: 'currentVideo',
  initialState: initialState as VideoPageType | undefined,
  reducers: {
    // setCurrentVideo(state, action: PayloadAction<WatchType>) {
    //   // console.log(action.payload);
    //   return action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(getWatchThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(createCommentThunk.fulfilled, (state, action) => ({
      ...state,
      Comments: action.payload,
    }));
    builder.addCase(addSubThunk.fulfilled, (state, action) => {
      const ind = state?.Channel.Subscriptions.findIndex(
        (el) => el.id === action.payload.id,
      ) as number;
      if (ind >= 0) {
        state?.Channel.Subscriptions.splice(ind, 1);
      } else {
        state?.Channel.Subscriptions.push(action.payload);
      }
    });
    builder.addCase(setLikeThunk.fulfilled, (state, action) => {
      if (state) {
        if (state.Likes.findIndex((el) => el.id === action.payload.id) >= 0) {
          state.Likes = state?.Likes.filter((el) => el.id !== action.payload.id);
        } else {
          state?.Likes.push(action.payload);
        }
      }
    });
    builder.addCase(reportThunk.fulfilled, (state, action) => {
      return (state.reports += 1);
    });
  },
});

export default watchSlice.reducer;
