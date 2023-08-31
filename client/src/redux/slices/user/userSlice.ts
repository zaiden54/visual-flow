import { createSlice } from '@reduxjs/toolkit';
import type { UserType } from '../../../types/userTypes';
import { checkUserThunk, loginUserThunk, logoutUserThunk, signUpUserThunk } from './userThunks';

type UserSliceType = {
  data: UserType;
  error: Error | null;
  logoutDialogOpened: boolean;
};

const initialState: UserSliceType = {
  data: { status: 'loading' },
  error: null,
  logoutDialogOpened: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // checkUserThunk
    builder.addCase(checkUserThunk.fulfilled, (state, { payload }) => {
      state.data = {
        ...payload,
        status: 'logged',
      };
    });
    builder.addCase(checkUserThunk.pending, (state) => {
      state.data = { status: 'loading' };
    });
    builder.addCase(checkUserThunk.rejected, (state) => {
      state.data = { status: 'guest' };
    });

    // signUpUserThunk
    builder.addCase(signUpUserThunk.fulfilled, (state, { payload }) => {
      state.data = {
        ...payload,
        status: 'logged',
      };
    });
    builder.addCase(signUpUserThunk.rejected, (state) => {
      state.data = { status: 'guest' };
    });

    // loginUserThunk
    builder.addCase(loginUserThunk.fulfilled, (state, { payload }) => {
      state.data = {
        ...payload,
        status: 'logged',
      };
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.data = { status: 'guest' };
    });

    // logoutUserThunk
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.data = { status: 'guest' };
    });
    builder.addCase(logoutUserThunk.rejected, (state) => state);
  },
});

export default userSlice.reducer;
