import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './redux/hooks/reduxHooks';
import { checkUserThunk } from './redux/slices/user/userThunks';
import AuthPage from './components/pages/AuthPage';
import MainPage from './components-Yana/pages-Yana/MainPage';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(checkUserThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
    <Routes>
      <Route path='/' element={<MainPage/>}/>
      <Route path="/auth/:auth" element={<AuthPage />} />
    </Routes>
  </Container>
  );
}

export default App;
