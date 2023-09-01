import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import type { SubType } from '../../../types/subTypes';

export const getSubChannelThunk = createAsyncThunk<SubType, number>(
  'subChannels/getChannels',
  async (offset: number): Promise<SubType> => {
    const { data } = await apiService.get<SubType>(`/videos/subs/channels/${offset}`);

    return data;
  },
);
export const getFirstSubChannelThunk = createAsyncThunk<SubType, number>(
  'subChannels/getFirstChannels',
  async (offset): Promise<SubType> => {
    const { data } = await apiService.get<SubType>(`/videos/subs/channels/${offset}`);

    return data;
  },
);
