import React from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
// import CameraIcon from '@material-ui/icons/PhotoCamera';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Grid from '@material-ui/core/Grid';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
// import Link from '@material-ui/core/Link';
// import Board from './components/boards/board';
// import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/board/index';
import Register from './components/register/index';
import Login from './components/login/index';
import BoardDetail from './components/boardDetail/index';

export default function Album() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/boards" children={<Home />} />
          <Route path="/register" children={<Register />} />
          <Route path="/login" children={<Login />} />
          <Route path="/boards/board-detail/:id" children={<BoardDetail />} />
        </Switch>
      </div>
    </Router>
  );
}
