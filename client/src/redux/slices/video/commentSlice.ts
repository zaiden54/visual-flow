import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { CommentType } from '../../../types/commentType';
import getAllCommentsVideoThunk from './commentThunk';

const initialState: CommentType[] = [];

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentCreate(state, action: PayloadAction<CommentType>) {
        state.push(action.payload);
      },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCommentsVideoThunk.fulfilled, (state, action) => action.payload);
  },
});

const commentReducer = commentSlice.reducer;
export const { commentCreate } = commentSlice.actions;

export default commentReducer;