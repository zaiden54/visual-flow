import { createSlice } from '@reduxjs/toolkit';
import type { SubType } from '../../../types/subTypes';
import searchThunk from './searchThunk';

const initialState = {
  count: 0,
  rows: []
} as SubType;

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchThunk.fulfilled, (state, action) => ({...state, rows: [...state.rows, ...action.payload.rows]}) )
}});

export default searchSlice.reducer;
