/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import type { SubscriptionsType } from '../../../types/videotypes';

export const addSubThunk = createAsyncThunk<SubscriptionsType, SubscriptionsType>(
  'sub/add',
  async ({ userId, channelId }): Promise<SubscriptionsType> => {
    const { data } = await apiService.post<SubscriptionsType>('/subscription', {
      userId,
      channelId,
    });
    return data;
  },
);
