/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import type { SubscriptionsType } from '../../../types/videotypes';

export type AddSubThunkType = {
  userId: number;
  channelId: number;
};

export const addSubThunk = createAsyncThunk<SubscriptionsType, AddSubThunkType>(
  'sub/add',
  async ({ userId, channelId }) => {
    const { data } = await apiService.post<SubscriptionsType>('/subscription', {
      userId,
      channelId,
    });
    return data;
  },
);
