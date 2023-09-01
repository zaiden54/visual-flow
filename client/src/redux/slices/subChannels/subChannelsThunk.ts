import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { SubType } from '../../../types/subTypes';

const getSubChannelThunk = createAsyncThunk<SubType,number>(
  'subChannels/getChannels',
  async (offset: number): Promise<SubType> => {
    const { data } = await axios<SubType>(`/videos/channels/${offset}`);
    return data;
  },
);

export default getSubChannelThunk;
