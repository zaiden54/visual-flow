import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import type { ReportType, VideoPageType } from '../../../types/videotypes';
import type { LikeType, SetLikeThunkParams } from '../../../types/likeTypes';

export const getWatchThunk = createAsyncThunk(
  'watch/video',
  async (link: string): Promise<VideoPageType> => {
    const { data } = await apiService.get<VideoPageType>(`/watch/info/${link}`);
    return data;
  },
);

export const setLikeThunk = createAsyncThunk<LikeType, SetLikeThunkParams>(
  '/videos/like',
  async ({ videoId, userId }) => {
    const { data } = await apiService.put<LikeType>('/videos/like', { videoId, userId });
    return data;
  },
);

export const reportThunk = createAsyncThunk<ReportType, number>('/videos/rep', async (videoId) => {
  const { data } = await apiService.post<ReportType>('/videos/rep', { videoId });
  return data;
});
