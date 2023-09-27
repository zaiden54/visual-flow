import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRouter from './components/PrivateRouter';
import AdminPage from './components/pages/AdminPage';
import AuthPage from './components/pages/AuthPage';
import ChannelPage from './components/pages/ChannelPage';
import FillerPage from './components/pages/FillerPage';
import MainPage from './components/pages/MainPage';
import MostViewedPage from './components/pages/MostViewedPage';
import RoomsPage from './components/pages/RoomsPage';
import SearchPage from './components/pages/SearchPage';
import SubscriptionsPage from './components/pages/SubscriptionsPage';
import VideoPage from './components/pages/VideoPage';
import Comments from './components/ui/Comments';
import ModalWindow from './components/ui/ModalWindow';
import { useAppDispatch, useAppSelector } from './redux/hooks/reduxHooks';
import { checkUserThunk } from './redux/slices/user/userThunks';

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
          <Route path="/popular" element={<MostViewedPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/subs" element={<SubscriptionsPage />} />
          <Route path="/search/:searchString" element={<SearchPage />} />
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
          <Route path="/filler" element={<FillerPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
