import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user/userSlice';
import videoReducer from './slices/video/videoSlice';
import randomVideoReducer from './slices/video/randomVideoSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    videos: videoReducer,
    random: randomVideoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
