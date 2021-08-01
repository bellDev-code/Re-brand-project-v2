import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from '../Pages/Login';

const App = () => {
  return (
    <Router>
      <Switch>
        {/* render={()=> <Login />} */}
        <Route exact path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Redirect exact path="/" to={Login}></Redirect>
      </Switch>
    </Router>
  );
};

export default App;
