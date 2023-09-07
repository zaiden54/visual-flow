import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { WatchType } from '../../../types/videotypes';

type SwapModalType = {
  value: boolean,
  video: WatchType
};

const initialState: SwapModalType = {
  value: false,
  video: {}
};

const editModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    swapEditModal(state, action: PayloadAction<SwapModalType>) {
      return action.payload
    }
  }
});

export default editModalSlice.reducer;

export const { swapEditModal} = editModalSlice.actions
