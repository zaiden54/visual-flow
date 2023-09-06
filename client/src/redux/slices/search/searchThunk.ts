import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import type { WatchType } from '../../../types/videotypes';

const searchThunk = createAsyncThunk<WatchType, string>(
  '/videos/search/0',
  async ({searchString, offset}): Promise<WatchType> => {
    console.log(offset)
    const { data } = await apiService.post<WatchType>(`/videos/search/${offset}`, searchString);
    console.log(data)
    return data;
  },
);

export default searchThunk