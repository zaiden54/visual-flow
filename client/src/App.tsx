import { Container, CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components-Yana/pages-Yana/MainPage';
import AuthPage from './components/pages/AuthPage';
import { useAppDispatch } from './redux/hooks/reduxHooks';
import { checkUserThunk } from './redux/slices/user/userThunks';
import NavBar from './components-Erzhena/UI-Erzhena/NavBar';

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
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth/:auth" element={<AuthPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
