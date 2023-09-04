import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import type { VideoPageType, VideoType, WatchChannelType } from '../../../types/videotypes';

const getWatchThunk = createAsyncThunk('watch/video', async (link: string): Promise<VideoPageType> => {
  const { data } = await apiService.get<VideoPageType>(`/watch/info/${link}`);
  return data;
});

export default getWatchThunk;
