import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './slices/channel/channelSlice';
import modalReducer from './slices/modals/modalSlice';
import subChannelReducer from './slices/subChannels/subChannelSlice';
import userReducer from './slices/user/userSlice';
import randomVideoReducer from './slices/video/randomVideoSlice';
// import videoSubReducer from './slices/video/subAllSlice';
import roomsReducer from './slices/rooms/roomSlice';
import searchReducer from './slices/search/searchSlice';
import allRepReducer from './slices/video/reportSlice';
import videoReducer from './slices/video/videoSlice';
import currentVideoReducer from './slices/video/watchSlice';
import editModalReducer from './slices/modals/editModalSlice'

export const store = configureStore({
  reducer: {
    editModal: editModalReducer,
    search: searchReducer,
    user: userReducer,
    modal: modalReducer,
    videos: videoReducer,
    random: randomVideoReducer,
    subs: subChannelReducer,
    // subVideos: videoSubReducer,
    channel: channelReducer,
    currentVideo: currentVideoReducer,
    allReps: allRepReducer,
    rooms: roomsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
