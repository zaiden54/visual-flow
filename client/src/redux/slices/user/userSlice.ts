import { createSlice } from '@reduxjs/toolkit';
import type { UserModelType } from '../../../types/userTypes';
import { checkUserThunk, loginUserThunk, logoutUserThunk, signUpUserThunk } from './userThunks';

type UserSliceType = {
  data: UserModelType;
  status: 'loading' | 'logged' | 'guest';
  error: Error | null;
  logoutDialogOpened: boolean;
};

const initialState: UserSliceType = {
  data: {
    id: 0,
    username: '',
    email: '',
    name: '',
    roleId: 0,
  },
  status: 'loading',
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
      };
      state.status = 'logged';
    });
    builder.addCase(checkUserThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(checkUserThunk.rejected, (state) => {
      state.status = 'guest';
    });

    // signUpUserThunk
    builder.addCase(signUpUserThunk.fulfilled, (state, { payload }) => {
      state.data = {
        ...payload,
      };
      state.status = 'logged';
    });
    builder.addCase(signUpUserThunk.rejected, (state) => {
      state.status = 'guest';
    });

    // loginUserThunk
    builder.addCase(loginUserThunk.fulfilled, (state, { payload }) => {
      state.data = {
        ...payload,
      };
      state.status = 'logged';
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.status = 'guest';
    });

    // logoutUserThunk
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.status = 'guest';
    });
    builder.addCase(logoutUserThunk.rejected, (state) => {
      state.status = 'guest';
    });
  },
});

export default userSlice.reducer;
