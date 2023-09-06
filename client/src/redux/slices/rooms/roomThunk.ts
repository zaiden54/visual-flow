import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RoomType } from '../../../types/roomTypes';
import type { WatchType } from '../../../types/videotypes';
import apiService from '../../../services/config';

const createRoomThunk = createAsyncThunk<RoomType, WatchType>(
  '/rooms/create',
  async (video: WatchType): Promise<RoomType> => {
    const { data } = await apiService.post<RoomType>('/room/new', { video });

    return data;
  },
);

export default createRoomThunk;
