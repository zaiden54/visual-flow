import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { ChannelType, VideoType } from '../../../types/videotypes';

export const getSubVideoThunk = createAsyncThunk<ChannelType[]>(
  '/videos/subs',
  async (): Promise<ChannelType[]> => {
    const { data } = await axios<ChannelType[]>('/videos/subs');
    return data;
  },
);

export const getRandomVideoThunk = createAsyncThunk<VideoType[]>(
  '/videos/random',
  async (): Promise<VideoType[]> => {
    const { data } = await axios<VideoType[]>('/videos/random');
    return data;
  },
);
