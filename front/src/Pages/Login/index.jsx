import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('jongho');
  const [password, setPassword] = useState('lee1313');

  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = e.target[0].value;
      const password = e.target[1].value;
      // axios({
      //   method: "POST",
      //   data: {
      //   }
      // })
      const { data } = await axios.post(
        'http://localhost:4190/api/users/login',
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        },
      );
      if (data.success) {
        history.push('/home');
        return;
      }
      throw new Error(data.error?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>아이디</label>
        <input type="text" value={username} onChange={onChangeUsername} />
        <label>비밀번호</label>
        <input type="password" value={password} onChange={onChangePassword} />
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
