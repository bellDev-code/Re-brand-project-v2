import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Main from './Main';
import Login from '@Pages/Login';

const App = () => {
  return (
    <Router>
      <Switch>
        {/* render={()=> <Login />} */}
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Redirect exact path="/" to={Login}></Redirect>
      </Switch>
    </Router>
  );
};

export default App;
