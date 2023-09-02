import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { ChannelType, VideoType } from '../../../types/videotypes';
import apiService from '../../../services/config';

export const getSubVideoThunk = createAsyncThunk<VideoType[]>(
  '/videos/subs',
  async (): Promise<VideoType[]> => {
    const { data } = await apiService<VideoType[]>('/videos/subs');
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
