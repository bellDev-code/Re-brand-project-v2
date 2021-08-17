import React, { useState } from 'react';
import axios from 'axios';
import { Container, AccountForm, FindForm, InputWrapper, ButtonWrapper, FindBtn } from './styles';

const Find = () => {
  const [email, setEmail] = useState('sumaoo20@naver.com');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:4190/api/users/find');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <AccountForm>
        <h3>Find User</h3>
        <FindForm onSubmit={onSubmit}>
          <InputWrapper>
            <label>Email</label>
            <input type="email" value={email} onChange={onChangeEmail} />
          </InputWrapper>
          <ButtonWrapper>
            <FindBtn type="submit">Find</FindBtn>
          </ButtonWrapper>
        </FindForm>
      </AccountForm>
    </Container>
  );
};

export default Find;
