/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import type { SubscriptionsType } from '../../../types/videotypes';
// import { unsubFromChannel } from '../subChannels/subChannelSlice';
// import { useAppDispatch } from '../../hooks/reduxHooks';

export const addSubThunk = createAsyncThunk<SubscriptionsType, SubscriptionsType>(
  'sub/add',
  async ({ userId, channelId }): Promise<SubscriptionsType> => {
    const { data } = await apiService.post<SubscriptionsType>('/subscription', {
      userId,
      channelId,
    });

    // console.log(data)

    return data;
  },
);
