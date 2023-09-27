import { Box, Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import type { UserLoginFormType, UserSignUpFormType } from '../../types/userTypes';
import { loginUserThunk, signUpUserThunk } from '../../redux/slices/user/userThunks';
import { useAppDispatch } from '../../redux/hooks/reduxHooks';

export default function AuthPage(): JSX.Element {
  const { auth } = useParams();
  const dispatch = useAppDispatch();

  if (auth !== 'signup' && auth!=='signin') {
    return <Navigate to='/' />
  } 

  const submitHandler: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    auth === 'signup'
      ? void dispatch(signUpUserThunk(formData as UserSignUpFormType))
      : void dispatch(loginUserThunk(formData as UserLoginFormType));
  };

  return (
    <Grid container direction="row" justifyContent="center">
      <Grid item xs={6}>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          alignItems="center"
          py={5}
          onSubmit={submitHandler}
        >
        {/* <div style={{marginBottom: "30px"}}>
          <img style={{width: "70px"}} alt='error' src="../../../pngwing.com.png"/>
        </div> */}
          {auth === 'signup' && (
            <TextField
              sx={{ mb: 4}}
              variant="outlined"
              name="username"
              label="Name"
            />
          )}
          <TextField
            sx={{ mb: 4}}
            variant="outlined"
            name="email"
            label="Email"
            type="email"
          />
          <TextField
            sx={{ mb: 4}}
            variant="outlined"
            name="password"
            label="Password"
            type="password"
          />
          <Button variant="contained" type="submit">
            {auth === 'signup' ? 'Sign Up' : 'Login'}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
