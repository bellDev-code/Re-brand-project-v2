import React, { useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/index';

const Home = () => {
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
      <Header></Header>
      Home
    </div>
  );
};

export default Home;
