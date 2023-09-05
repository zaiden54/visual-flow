import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { SubType } from '../../../types/subTypes';
import { getSubChannelThunk, getFirstSubChannelThunk } from './subChannelsThunk';
import { addSubThunk } from '../subs/subThunk';

const initialState = {} as SubType;

const subChannelsSlice = createSlice({
  name: 'subs',
  initialState,
  reducers: {
    // unsubFromChannel(state, action: PayloadAction<number>) {
    //   return state.rows.filter((el) => el.id !== action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getFirstSubChannelThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(getSubChannelThunk.rejected, (state, action) => state);
    builder.addCase(getSubChannelThunk.fulfilled, (state, action) =>
      action.payload.rows.forEach((el) => state.rows.push(el)),
    );

    builder.addCase(addSubThunk.fulfilled, (state, action) => {
      const i = state?.rows.findIndex((el) => el.id === action.payload.channelId);
      if (i >= 0) {
        return { ...state, rows: state.rows.filter((el) => el.id !== action.payload.channelId), count: state.count - 1 };
      }
      state.rows.push(action.payload.Channel);
    });
  },
});

export default subChannelsSlice.reducer;

// export const { unsubFromChannel } = subChannelsSlice.actions;
