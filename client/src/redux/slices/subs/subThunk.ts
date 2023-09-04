import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ChannelType, SubscriptionsType } from '../../../types/videotypes';
import apiService from '../../../services/config';

export const addSubThunk = createAsyncThunk<SubscriptionsType, number>(
  'sub/add',
  async (userId: number, channelId: number): Promise<ChannelType> => {
    const { data } = await apiService.post<ChannelType>('/sub', { userId, channelId });
    return data;
  },
);
