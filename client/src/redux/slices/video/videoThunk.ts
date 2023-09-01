import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { ChannelType } from '../../../types/videotypes';

export const getSubVideoThunk = createAsyncThunk<ChannelType[]>('/videos/subs', async (): Promise<ChannelType[]> => {
  const { data } = await axios<ChannelType[]>('/videos/subs');
  return data;
});

export const getRandomVideoThunk = createAsyncThunk<ChannelType[]>('/videos/random', async (): Promise<ChannelType[]> => {
  const { data } = await axios<ChannelType[]>('/videos/random');
  return data;
});



