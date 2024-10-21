import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import type { CommentFormType, CommentsType } from '../../../types/videotypes';

type CreateCommentThunkType = {
  link: string;
  formData: CommentFormType;
};

const createCommentThunk = createAsyncThunk<CommentsType[], CreateCommentThunkType>(
  'watch/addComment',
  async ({ link, formData }) => {
    const { data } = await apiService.post<CommentsType[]>(`/watch/info/${link}`, formData);
    return data;
  },
);

export default createCommentThunk;
