import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user/userSlice';
import modalReducer from './slices/modals/modalSlice';
import videoReducer from './slices/video/videoSlice';
import randomVideoReducer from './slices/video/randomVideoSlice';
import subChannelReducer from './slices/subChannels/subChannelSlice';
import videoSubReducer from './slices/video/subAllSlice';
import commentSlice from './slices/video/commentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    videos: videoReducer,
    random: randomVideoReducer,
    subs: subChannelReducer,
    subVideos: videoSubReducer,
    comments: commentSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
