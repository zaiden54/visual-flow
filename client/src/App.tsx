import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch } from './redux/hooks/reduxHooks';
import { checkUserThunk } from './redux/slices/user/userThunks';
import AuthPage from './components/pages/AuthPage';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  axios.defaults.baseURL = "http://localhost:3001/api";
  axios.defaults.withCredentials = true;
  useEffect(() => {
    void dispatch(checkUserThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
    <Routes>
      <Route path="/auth/:auth" element={<AuthPage />} />
    </Routes>
  </Container>
  );
}

export default App;
