import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../components/App';
import ChatPage from '../components/ChatPage';
import LoginPage from '../components/LoginPage';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage}></Route>
        <Route path="/chat" component={ChatPage}></Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;