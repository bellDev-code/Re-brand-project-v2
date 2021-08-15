import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Main from './Main';
import Login from '@Pages/Login';
import Register from '@Pages/Register';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <main>
      <Router>
        <Switch>
          {/* render={()=> <Login />} */}
          <Route exact path="/" component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Redirect exact path="/" to="/login" />
        </Switch>
      </Router>
      <ToastContainer />
    </main>
  );
};

export default App;
