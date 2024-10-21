import { createSlice } from '@reduxjs/toolkit';
import type { SubType } from '../../../types/subTypes';
import { addSubThunk } from '../subs/subThunk';
import { getFirstSubChannelThunk, getSubChannelThunk } from './subChannelsThunk';

const initialState = {} as SubType;

const subChannelsSlice = createSlice({
  name: 'subs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFirstSubChannelThunk.fulfilled, (_, action) => action.payload);
    builder.addCase(getSubChannelThunk.rejected, (state) => state);
    builder.addCase(getSubChannelThunk.fulfilled, (state, action) =>
      action.payload.rows.forEach((el) => state.rows.push(el)),
    );

    builder.addCase(addSubThunk.fulfilled, (state, action) => {
      const i = state?.rows.findIndex((el) => el.id === action.payload.channelId);
      if (i >= 0) {
        return {
          ...state,
          rows: state.rows.filter((el) => el.id !== action.payload.channelId),
          count: state.count - 1,
        };
      }
      state.rows.push(action.payload.Channel);
    });
  },
});

export default subChannelsSlice.reducer;
