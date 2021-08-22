import React, { useCallback, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Container, AccountForm, LoginForm, ButtonWrapper, LoginBtn } from './styles';
import LabelInput from '@Components/LabelInput';
import { AuthContext } from '@Hooks/Contexts/AuthContext';

const Login = () => {
  const history = useHistory();
  const { refetch } = useContext(AuthContext);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const username = e.target[0].value;
      const password = e.target[1].value;

      try {
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
          refetch();
          history.push('/');
          return;
        }
        throw new Error(data.error?.message);
      } catch (error) {
        console.log(error);
      }
    },
    [history],
  );

  return (
    <Container>
      <AccountForm>
        <h3>Login</h3>
        <LoginForm onSubmit={onSubmit}>
          <LabelInput name="Username" />
          <LabelInput name="Password" type="password" />
          <ButtonWrapper>
            <LoginBtn type="submit">login</LoginBtn>
          </ButtonWrapper>
          <Link to="/register" style={{ paddingTop: '20px' }}>
            Create Your Account?
          </Link>
          <Link to="/find">Find Your Username?</Link>
        </LoginForm>
      </AccountForm>
    </Container>
  );
};

export default Login;
