import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRouter from './components/PrivateRouter';
import AuthPage from './components/pages/AuthPage';
import MainPage from './components/pages/MainPage';
import MostViewedPage from './components/pages/MostViewedPage';
import RoomsPage from './components/pages/RoomsPage';
import SubscriptionsPage from './components/pages/SubscriptionsPage';
import { useAppDispatch, useAppSelector } from './redux/hooks/reduxHooks';
import { checkUserThunk } from './redux/slices/user/userThunks';
import VideoPage from './components/pages/VideoPage';
import Comments from './components/ui/ButtonMenuLeftTest'
import TestChatPage from './components/pages/TestChatPage';
import ModalWindow from './components/ui/ModalWindow';

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
    <>
    <ModalWindow />
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Routes>
          <Route path="/watch/:link" element={<VideoPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/mostViewed" element={<MostViewedPage />} />
          <Route path="/" element={<MainPage />} />
          <Route
            element={<PrivateRouter redirectTo="/" isAllowed={user.data.status !== 'logged'} />}
          >
            <Route path="/auth/:auth" element={<AuthPage />} />
          </Route>
          {/* <Route path="/watch" element={<VideoPage />} /> */}
          {/* <Route path="/ololo" element={<Comments />} />  */}
          <Route path='/chat' element={<TestChatPage/>}/>
        </Routes>
      </div>
    </ThemeProvider>
    </>
  );
}

export default App;
