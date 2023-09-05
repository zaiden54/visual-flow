import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import type { VideoPageType } from '../../../types/videotypes';
import type { LikeType } from '../../../types/likeTypes';

export const getWatchThunk = createAsyncThunk('watch/video', async (link: string): Promise<VideoPageType> => {
  const { data } = await apiService.get<VideoPageType>(`/watch/info/${link}`);
  return data;
});

export const setLikeThunk = createAsyncThunk(
  '/videos/like',
  async ({videoId, userId}: LikeType): Promise<LikeType> => {
    const { data } = await apiService.put<LikeType>('/videos/like', {videoId, userId});
    return data;
  },
);