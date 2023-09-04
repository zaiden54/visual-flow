/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ChannelType, SubscriptionsType } from '../../../types/videotypes';
import apiService from '../../../services/config';

export const addSubThunk = createAsyncThunk<SubscriptionsType, SubscriptionsType>(
  'sub/add',
  async ({ userId, channelId }): Promise<SubscriptionsType> => {
    console.log(userId, '-------', channelId);

    const { data } = await apiService.post<SubscriptionsType>('/subscription', {
      userId,
      channelId,
    });
    console.log(data);
  
      return data;
    
  },
);
