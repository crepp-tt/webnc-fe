import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import LoginCard from './loginCard';
import { Redirect } from 'react-router-dom';

export default function Login() {
  return localStorage.getItem('token') ? (
    <Redirect to="/" />
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <LoginCard />
    </Container>
  );
}
