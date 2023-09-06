import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import type { ReportType, VideoPageType } from '../../../types/videotypes';
import type { LikeType } from '../../../types/likeTypes';

export const getWatchThunk = createAsyncThunk(
  'watch/video',
  async (link: string): Promise<VideoPageType> => {
    const { data } = await apiService.get<VideoPageType>(`/watch/info/${link}`);
    return data;
  },
);

export const setLikeThunk = createAsyncThunk(
  '/videos/like',
  async ({ videoId, userId }: LikeType): Promise<LikeType> => {
    const { data } = await apiService.put<LikeType>('/videos/like', { videoId, userId });
    return data;
  },
);

export const reportThunk = createAsyncThunk<ReportType, number>(
  '/video/report',
  async (videoId): Promise<ReportType> => {
    const { data } = await apiService.post<ReportType>('/videos/report', videoId);
    console.log(data);
    
    return data;
  },
);

// export const countViewsThunk = createAsyncThunk('/videos/view', async (link: string) => {
//   const { data } = await apiService.put(`/watch/${link}`);
//   return data;
// });
