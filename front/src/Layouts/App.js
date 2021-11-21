import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Main';
import MainShop from './MainShop';
import Login from '@Pages/Login';
import Register from '@Pages/Register';
import FindUsername from '@Pages/Find/FindUsername';
import Change from '@Pages/Find/Change';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from '@Hooks/Contexts/AuthContext';
import FindPassword from '@Pages/Find/FindPassword';
import { Global } from '@emotion/react';
import GlobalStyles from '@Styles/Global';
import ProductDetail from './Product/Detail';

const App = () => {
  return (
    <main>
      <Global styles={GlobalStyles} />
      <Router>
        <Switch>
          {/* render={()=> <Login />} */}
          <AuthContextProvider>
            <Route exact path="/" component={Main} />
            <Route path="/products" component={MainShop} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/find/username" component={FindUsername} />
            <Route path="/find/password" component={FindPassword} />
            <Route path="/change/:username" component={Change} />
          </AuthContextProvider>
        </Switch>
      </Router>
      <ToastContainer />
    </main>
  );
};

export default App;
