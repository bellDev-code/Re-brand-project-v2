import React, { useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const getMyProfile = async () => {
    try {
      const { data } = await axios.get('http://localhost:4190/api/users');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  return <div>Home</div>;
};

export default Home;
