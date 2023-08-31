import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { ChannelType } from '../../../types/videotypes';

const getSubVideoThunk = createAsyncThunk<ChannelType[]>('/videos/subs', async () => {
  const { data } = await axios<ChannelType[]>('/videos/subs');
  return data;
});

export default getSubVideoThunk;
