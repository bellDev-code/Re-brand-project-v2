import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Container, AccountForm, LoginForm, InputWrapper, ButtonWrapper, LoginBtn } from './styles';

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
        history.push('/');
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
    <Container>
      <AccountForm>
        <h3>Login</h3>
        <LoginForm onSubmit={onSubmit}>
          <InputWrapper>
            <label>Username</label>
            <input type="text" value={username} onChange={onChangeUsername} />
          </InputWrapper>
          <InputWrapper>
            <label>Password</label>
            <input type="password" value={password} onChange={onChangePassword} />
          </InputWrapper>
          <ButtonWrapper>
            <LoginBtn type="submit">login</LoginBtn>
          </ButtonWrapper>
          <div style={{ paddingTop: '20px' }}>Create Your Account? </div>
        </LoginForm>
      </AccountForm>
    </Container>
  );
};

export default Login;
