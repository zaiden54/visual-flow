import type { PayloadAction} from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type SwapModalType = {
  value: boolean
};

const initialState: SwapModalType = {
  value: false
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    swapModal(state, action: PayloadAction<SwapModalType>) {
        state.value = action.payload.value
    },
    swapEditModal(state, action: PayloadAction<SwapModalType>) {
      state.value = action.payload.value
    }
  }
});

export default modalSlice.reducer;

export const {swapModal, swapEditModal} = modalSlice.actions
