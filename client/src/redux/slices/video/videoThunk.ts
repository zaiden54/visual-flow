import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import type { ReportType, VideoType } from '../../../types/videotypes';

export const getSubVideoThunk = createAsyncThunk<VideoType[]>(
  '/videos/subs',
  async (): Promise<VideoType[]> => {
    const { data } = await apiService<VideoType[]>('/videos/subs');
    return data;
  },
);

export const getAllSubVideoThunk = createAsyncThunk<VideoType[]>(
  '/videos/subs/all',
  async (): Promise<VideoType[]> => {
    const { data } = await apiService<VideoType[]>('/videos/subs/all');
    return data;
  },
);

export const getRandomVideoThunk = createAsyncThunk<VideoType[]>(
  '/videos/random',
  async (): Promise<VideoType[]> => {
    const { data } = await apiService<VideoType[]>('/videos/random');
    return data;
  },
);

export const getAllReportedVideosThunk = createAsyncThunk<ReportType[]>(
  '/videos/repAll',
  async (): Promise<ReportType[]> => {
    const { data } = await apiService.get<ReportType[]>('/videos/rep/all');
    return data;
  },
);
