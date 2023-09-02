import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './components/pages/AuthPage';
import MainPage from './components/pages/MainPage';
import MostViewedPage from './components/pages/MostViewedPage';
import RoomsPage from './components/pages/RoomsPage';
import SubscriptionsPage from './components/pages/SubscriptionsPage';
import { useAppDispatch } from './redux/hooks/reduxHooks';
import { checkUserThunk } from './redux/slices/user/userThunks';
import VideoPage from './components/pages/VideoPage';
import Comments from './components/ui/ButtonMenuLeftTest'

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

  axios.defaults.baseURL = 'http://localhost:3001/api';
  axios.defaults.withCredentials = true;
  useEffect(() => {
    void dispatch(checkUserThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Routes>
          <Route path='/subs' element={<SubscriptionsPage/>}/>
          <Route path='/rooms' element={<RoomsPage/>}/>
          <Route path='/mostViewed' element={<MostViewedPage/>}/>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth/:auth" element={<AuthPage />} />
          <Route path="/watch" element={<VideoPage />} />
          <Route path="/ololo" element={<Comments />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
