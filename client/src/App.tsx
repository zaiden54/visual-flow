import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRouter from './components/PrivateRouter';
import AuthPage from './components/pages/AuthPage';
import ChannelPage from './components/pages/ChannelPage';
import MainPage from './components/pages/MainPage';
import MostViewedPage from './components/pages/MostViewedPage';
import RoomsPage from './components/pages/RoomsPage';
import SubscriptionsPage from './components/pages/SubscriptionsPage';
import VideoPage from './components/pages/VideoPage';
import TestChatPage from './components/pages/TestChatPage';
import ModalWindow from './components/ui/ModalWindow';
import { useAppDispatch, useAppSelector } from './redux/hooks/reduxHooks';
import { checkUserThunk } from './redux/slices/user/userThunks';
import Comments from './components/ui/Comments';
import MiniDrawer from './components/ui/ButtonMenuLeftTest';
import AdminPage from './components/pages/AdminPage';

function App(): JSX.Element {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);
  console.log(user.data.status === 'logged');

  useEffect(() => {
    void dispatch(checkUserThunk());
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ModalWindow />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Routes>
          <Route path="/watch/:link" element={<VideoPage />} />
          <Route path="/watch/info/:link" element={<Comments />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/mostViewed" element={<MostViewedPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/subs" element={<SubscriptionsPage />} />
          <Route
            element={<PrivateRouter redirectTo="/" isAllowed={user.data.status !== 'logged'} />}
          >
            <Route path="/auth/:auth" element={<AuthPage />} />
          </Route>
          <Route
            element={
              <PrivateRouter
                redirectTo="/subs"
                isAllowed={user.data.status === 'logged' && user.data.roleId === 1}
              />
            }
          >
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          <Route path="/channel/:id" element={<ChannelPage />} />
          <Route path="/ololo" element={<MiniDrawer />} />
          <Route path="/chat" element={<TestChatPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
