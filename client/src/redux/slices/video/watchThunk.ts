import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import type { VideoPageType, VideoType, WatchChannelType } from '../../../types/videotypes';

export const getWatchThunk = createAsyncThunk('watch/video', async (link: string): Promise<VideoPageType> => {
  const { data } = await apiService.get<VideoPageType>(`/watch/info/${link}`);
  return data;
});

export const setLikeThunk = createAsyncThunk<VideoType[]>(
  '/videos/like',
  async ({videoId, userId}): Promise<VideoType[]> => {
    const { data } = await apiService.put<VideoType[]>('/videos/like', {videoId, userId});
    return data;
  },
);