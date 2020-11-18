import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Home() {
  return localStorage.getItem('token') ? (
    <Redirect to="/boards" />
  ) : (
    <Redirect to="/login" />
  );
}
