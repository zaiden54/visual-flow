import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './components/pages/AuthPage';
import MainPage from './components/pages/MainPage';
import MostViewedPage from './components/pages/MostViewedPage';
import RoomsPage from './components/pages/RoomsPage';
import SubscriptionsPage from './components/pages/SubscriptionsPage';
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Routes>
          <Route path="/watch/:link" element={<SubscriptionsPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/mostViewed" element={<MostViewedPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/auth/:auth" element={<AuthPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
