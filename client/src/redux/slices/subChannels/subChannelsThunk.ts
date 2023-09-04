import { createAsyncThunk } from '@reduxjs/toolkit';
import type { SubType } from '../../../types/subTypes';
import apiService from '../../../services/config';
import subGetAllService from '../../../services/subService';

export const getSubChannelThunk = createAsyncThunk<SubType, number>(
  'subChannels/getChannels',
  async (offset: number): Promise<SubType> => {
    const { data } = await apiService.get<SubType>(`/videos/subs/channels/${offset}`);

    return data;
  },
);
export const getFirstSubChannelThunk = createAsyncThunk<SubType, number>(
  'subChannels/getFirstChannels',
  async (offset) =>
    subGetAllService(offset)
      .then((data) => data)
      .catch((err) => Promise.reject(err)),
);
