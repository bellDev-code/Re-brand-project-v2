import useInput from '@Hooks/useInput';
import React from 'react';
import { Container, AccountForm, FindForm, InputWrapper, ButtonWrapper, FindBtn } from './styles';

const FindPassword = () => {
  const username = useInput('Lee');

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <AccountForm>
        <h3>Find Password</h3>
        <FindForm onSubmit={onSubmit}>
          <InputWrapper>
            <label>username</label>
            <input type="text" value={username.value} />
          </InputWrapper>
          <ButtonWrapper>
            <FindBtn type="submit">Find</FindBtn>
          </ButtonWrapper>
        </FindForm>
      </AccountForm>
    </Container>
  );
};

export default FindPassword;
