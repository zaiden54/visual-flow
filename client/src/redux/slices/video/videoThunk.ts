import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import type { VideoType } from '../../../types/videotypes';

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

const getRandomVideoThunk = createAsyncThunk<VideoType[]>(
  '/videos/random',
  async (): Promise<VideoType[]> => {
    const { data } = await apiService<VideoType[]>('/videos/random');
    return data;
  },
);

export default getRandomVideoThunk;
