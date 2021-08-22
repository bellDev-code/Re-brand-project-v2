import React, { useContext } from 'react';
import Header from '@Components/Header/index';
import Home from '@Pages/Home';
import Footer from '@Components/Footer';
import { AuthContext } from '@Hooks/Contexts/AuthContext';
import { Redirect } from 'react-router-dom';

const Main = () => {
  const { user } = useContext(AuthContext);

  if (user === null) {
    return <Redirect exact path="/" to="/login" />;
  }
  return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

export default Main;
