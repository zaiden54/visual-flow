import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import type { CommentFormType, WatchType } from '../../../types/videotypes'

type CreateCommentThunkType = {
  link: string,
  formData: CommentFormType
}

const createCommentThunk = createAsyncThunk('watch/addComment', async ({link, formData}: CreateCommentThunkType) => {
  const { data } = await apiService.post<WatchType>(`/watch/info/${link}`, formData);
  return data;
});

export default createCommentThunk;