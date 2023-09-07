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

export const getRandomVideoThunk = createAsyncThunk<VideoType[]>(
  '/videos/random',
  async (): Promise<VideoType[]> => {
    const { data } = await apiService<VideoType[]>('/videos/random');
    return data;
  },
);

export const updateVideoThunk = createAsyncThunk<VideoType>(
  '/videos/update',
  async ({ newTitle, newDesc, videoId }): Promise<VideoType> => {
    // console.log({newTitle, newDesc, videoId}, '----------------------------------------------------------------------')
    const { data } = await apiService.patch<VideoType>('/videos/update', {newTitle, newDesc, videoId});
    // console.log(data, '------------------------------------------')
    return data;
  },
);