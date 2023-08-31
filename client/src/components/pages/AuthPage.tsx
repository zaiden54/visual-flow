import { Box, Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import type { UserLoginFormType, UserSignUpFormType } from '../../types/userTypes';
import { loginUserThunk, signUpUserThunk } from '../../redux/slices/user/userThunks';
import { useAppDispatch } from '../../redux/hooks/reduxHooks';

export default function AuthPage(): JSX.Element {
  const { auth } = useParams();
  const dispatch = useAppDispatch();

  const submitHandler: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    auth === 'signup'
      ? void dispatch(signUpUserThunk(formData as UserSignUpFormType))
      : void dispatch(loginUserThunk(formData as UserLoginFormType));
  };

  return (
    <Grid container direction="row">
      <Grid item xs={3} />
      <Grid item xs={6}>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-around"
          py={5}
          onSubmit={submitHandler}
        >
          {auth === 'signup' && (
            <TextField
              variant="outlined"
              name="username"
              label="Username"
            />
          )}
          <TextField
            variant="outlined"
            name="email"
            label="Email"
            type="email"
          />
          <TextField
            variant="outlined"
            name="password"
            label="Password"
            type="password"
          />
          <Button variant="outlined" type="submit">
            {auth === 'signup' ? 'Sign Up' : 'Login'}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
