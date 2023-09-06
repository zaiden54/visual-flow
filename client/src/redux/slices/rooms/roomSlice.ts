import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RoomType } from '../../../types/roomTypes';
import createRoomThunk from './roomThunk';

const initialState: RoomType[] = [];

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createRoomThunk.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export default roomsSlice.reducer;
// export const { addOneRoom } = roomsSlice.actions;
