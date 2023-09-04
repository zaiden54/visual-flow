import { createSlice } from '@reduxjs/toolkit';
import type { SubscriptionsType } from '../../../types/videotypes';
import { addSubThunk } from './subThunk';

const initialState: SubscriptionsType[] = [];

const subSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addSubThunk.fulfilled, (state, action) => state.push(action.payload));
  },
});

export default subSlice.reducer;
