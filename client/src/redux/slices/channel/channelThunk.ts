import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ChannelType, VideoType } from '../../../types/videotypes';
import apiService from '../../../services/config';

export const getChannelThunk = createAsyncThunk<ChannelType, number>(
  '/channel/:id',
  async (id: number): Promise<ChannelType> => {
    const { data } = await apiService.get<ChannelType>(`/channel/${id}`);
    console.log(data);

    return data;
  },
);
