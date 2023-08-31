import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type {
  UserLoginFormType,
  UserModelType,
  UserSignUpFormType,
} from '../../../types/userTypes';

export const checkUserThunk = createAsyncThunk<UserModelType>('user/checkUser', async () => {
  const { data } = await axios<UserModelType>('/auth/check');
  return data;
});

export const signUpUserThunk = createAsyncThunk<UserModelType, UserSignUpFormType>(
  'user/signup',
  async (formData) => {
    const { data } = await axios.post<UserModelType>('/auth/signup', formData);
    return data;
  },
);

export const loginUserThunk = createAsyncThunk<UserModelType, UserLoginFormType>(
  'user/login',
  async (formData) => {
    const { data } = await axios.post<UserModelType>('/auth/signin', formData);
    return data;
  },
);

export const logoutUserThunk = createAsyncThunk('auth/logout', async () => axios('/auth/logout'));
