/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import type { ChannelType, VideoType } from '../../../types/videotypes';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { afterDeleteVideos } from './channelSlice';

export const getChannelThunk = createAsyncThunk<ChannelType, number>(
  '/channel/:id',
  async (id: number): Promise<ChannelType> => {
    const { data } = await apiService.get<ChannelType>(`/channel/${id}`);
    return data;
  },
);
export const deleteVideoThunk = createAsyncThunk('/channel/deleteVideo',
  async (videoId: number) => {
    const { data } = await apiService.delete<VideoType>(`/channel/delete/${videoId}`);
    return data;
  },
);