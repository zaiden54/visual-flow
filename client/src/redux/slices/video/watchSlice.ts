import { createSlice } from '@reduxjs/toolkit';
import { addSubThunk } from '../subs/subThunk';
import { getWatchThunk, reportThunk, setLikeThunk } from './watchThunk';
import createCommentThunk from './commentThunk';
import { VideoPageType } from '../../../types/videotypes';

const initialState = {} as VideoPageType;

const watchSlice = createSlice({
  name: 'currentVideo',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getWatchThunk.fulfilled, (_state, action) => action.payload);

    builder.addCase(createCommentThunk.fulfilled, (state, action) => {
      state.Comments = action.payload;
    });

    builder.addCase(addSubThunk.fulfilled, (state, action) => {
      const ind = state?.Channel?.Subscriptions.findIndex(
        (el) => el.id === action.payload.id,
      ) as number;
      if (ind >= 0) {
        state?.Channel?.Subscriptions.splice(ind, 1);
      } else {
        state?.Channel?.Subscriptions.push(action.payload);
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
      state.reports = action.payload;
    });
  },
});

export default watchSlice.reducer;
