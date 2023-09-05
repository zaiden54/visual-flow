import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import type { ChannelType } from '../../../types/videotypes';

export const getChannelThunk = createAsyncThunk<ChannelType, number>(
  '/channel/:id',
  async (id: number): Promise<ChannelType> => {
    const { data } = await apiService.get<ChannelType>(`/channel/${id}`);
    console.log(data);

    return data;
  },
);
