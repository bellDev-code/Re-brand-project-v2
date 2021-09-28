import React, { createContext, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Create Context
export const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  // console.log(user);

  const getMyProfile = useCallback(async () => {
    try {
      const { data } = await axios.get('http://localhost:4190/api/users', {
        withCredentials: true,
      });

      if (data?.data) {
        // 인증된 사람만 데이터가 오니깐 setUser에 user 객체를 넣어줌
        setUser(data.data);
      } else {
        // 요청했음에도 불구하고 데이터가 없으면 인증이 안됐다는 뜻 => null
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    getMyProfile();
  }, []);

  const refetch = useCallback(() => {
    getMyProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        // 요청하기 전 상태
        user: user,
        refetch: refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
