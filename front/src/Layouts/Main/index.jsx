import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@Components/Header/index';
import Home from '@Pages/Home';
import Footer from '@Components/Footer';

const Main = () => {
  const [user, setUser] = useState();
  const getMyProfile = async () => {
    try {
      const { data } = await axios.get('http://localhost:4190/api/users', {
        withCredentials: true,
      });

      if (data?.data) {
        setUser(data.data);
      }
    } catch (error) {
      console.log(error);
      setUser(undefined);
    }
  };
  console.log(user);

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <div>
      <Header user={user} />
      <Home />
      <Footer />
    </div>
  );
};

export default Main;
