import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Boards from './components/board/index';
import Register from './components/register/index';
import Login from './components/login/index';
import BoardDetail from './components/boardDetail/index';
import Home from './components/home/index';
import PrivateRoute from './components/util/privateRoute';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" children={<Home />} />
          <PrivateRoute exact path="/boards" component={Boards} />
          <Route path="/register" children={<Register />} />
          <Route path="/login" children={<Login />} />
          <Route path="/boards/board-detail/:id" children={<BoardDetail />} />
        </Switch>
      </div>
    </Router>
  );
}
