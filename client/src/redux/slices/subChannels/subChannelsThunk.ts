import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { SubType } from '../../../types/subTypes';
import apiService from '../../../services/config';

export const getSubChannelThunk = createAsyncThunk<SubType, number>(
  'subChannels/getChannels',
  async (offset: number): Promise<SubType> => {
    const { data } = await apiService.get<SubType>(`/videos/subs/channels/${offset}`);
    // console.log(data);

    return data;
  },
);
export const getFirstSubChannelThunk = createAsyncThunk<SubType, number>(
  'subChannels/getFirstChannels',
  async (offset): Promise<SubType> => {
    const { data } = await apiService.get<SubType>(`/videos/subs/channels/${offset}`);

    console.log('SERVER----------', data);

    return data;
  },
);
