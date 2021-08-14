import React from 'react';
import { Container, AccountForm, RegisterForm, InputWrapper, ButtonWrapper, RegisterBtn } from './styles';

const Register = () => {
  return (
    <Container>
      <AccountForm>
        <h3>Register</h3>
        <RegisterForm>
          <InputWrapper>
            <label>Username</label>
            <input type="text" />
          </InputWrapper>
          <InputWrapper>
            <label>email</label>
            <input type="email" />
          </InputWrapper>
          <InputWrapper>
            <label>Password</label>
            <input type="password" />
          </InputWrapper>
          <ButtonWrapper>
            <RegisterBtn type="submit">Register</RegisterBtn>
          </ButtonWrapper>
        </RegisterForm>
      </AccountForm>
    </Container>
  );
};

export default Register;
