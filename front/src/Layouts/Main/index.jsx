import React, { useEffect } from 'react';
import axios from 'axios';
import Header from '@Components/Header/index';
import Home from '@Pages/Home';
import Footer from '@Components/Footer';

const Main = () => {
  const getMyProfile = async () => {
    try {
      const { data } = await axios.get('http://localhost:4190/api/users', {
        withCredentials: true,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

export default Main;
