import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import { SearchState } from './searchSlice';

export type SearchThunkType = {
  searchString?: string;
  offset: number;
};

export const searchThunk = createAsyncThunk<SearchState, SearchThunkType>(
  '/videos/search/0',
  async ({ searchString, offset }) => {
    const { data } = await apiService.post(`/videos/search/${offset}`, { searchString });
    return data;
  },
);

export const addSearchThunk = createAsyncThunk<SearchState, SearchThunkType>(
  '/videos/search',
  async ({ searchString, offset }) => {
    const { data } = await apiService.post(`/videos/search/${offset}`, { searchString });
    return data;
  },
);
