import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user/userSlice';
import videoReducer from './slices/video/videoSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    videos: videoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
