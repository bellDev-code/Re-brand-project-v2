import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Main';
import MainShop from './MainShop';
import Login from '@Pages/Login';
import Register from '@Pages/Register';
import Find from '@Pages/Find/user';
import Change from '@Pages/Find/change';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from '@Hooks/Contexts/AuthContext';

const App = () => {
  return (
    <main>
      <Router>
        <Switch>
          {/* render={()=> <Login />} */}
          <AuthContextProvider>
            <Route exact path="/" component={Main} />
            <Route path="/shop" component={MainShop} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/find" component={Find} />
            <Route path="/change" component={Change} />
          </AuthContextProvider>
        </Switch>
      </Router>
      <ToastContainer />
    </main>
  );
};

export default App;
