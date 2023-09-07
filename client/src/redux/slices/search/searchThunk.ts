import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import type { WatchType } from '../../../types/videotypes';

export const searchThunk = createAsyncThunk<WatchType, string>(
  '/videos/search/0',
  async ({searchString, offset}): Promise<WatchType> => {
    const { data } = await apiService.post<WatchType>(`/videos/search/${offset}`, searchString);
    return data;
  },
);

export const addSearchThunk = createAsyncThunk<WatchType, string>(
  '/videos/search',
  async ({searchString, offset}): Promise<WatchType> => {
    const { data } = await apiService.post<WatchType>(`/videos/search/${offset}`, searchString);
    return data;
  },
);