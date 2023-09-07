import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import type {
  UserLoginFormType,
  UserModelType,
  UserSignUpFormType,
} from '../../../types/userTypes';

export const checkUserThunk = createAsyncThunk<UserModelType>('user/checkUser', async () => {
  const { data } = await apiService<UserModelType>('/auth/check');
  console.log('---------',data);
  
  return data;
});

export const signUpUserThunk = createAsyncThunk<UserModelType, UserSignUpFormType>(
  'user/signup',
  async (formData) => {
    const { data } = await apiService.post<UserModelType>('/auth/signup', formData);
    return data;
  },
);

export const loginUserThunk = createAsyncThunk<UserModelType, UserLoginFormType>(
  'user/login',
  async (formData) => {
    const { data } = await apiService.post<UserModelType>('/auth/signin', formData);
    return data;
  },
);

export const logoutUserThunk = createAsyncThunk('auth/logout', async () => apiService('/auth/logout'));
