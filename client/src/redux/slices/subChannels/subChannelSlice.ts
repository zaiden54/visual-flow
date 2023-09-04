import { createSlice } from '@reduxjs/toolkit';
import type { SubType } from '../../../types/subTypes';
import { getSubChannelThunk, getFirstSubChannelThunk } from './subChannelsThunk';

const initialState = {} as SubType;

const subChannelsSlice = createSlice({
  name: 'subs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFirstSubChannelThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(getSubChannelThunk.rejected, (state, action) => state);
    builder.addCase(getSubChannelThunk.fulfilled, (state, action) =>
      action.payload.rows.forEach((el) => state.rows.push(el)),
    );
  },
});

export default subChannelsSlice.reducer;
