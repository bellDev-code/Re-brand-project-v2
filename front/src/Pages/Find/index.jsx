import React from 'react';
import axios from 'axios';
import { Container, AccountForm, FindForm, InputWrapper, ButtonWrapper, FindBtn } from './styles';
import useInput from '@Hooks/useInput';

const Find = () => {
  const email = useInput('sumaoo20@naver.com');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:4190/api/users/find', {
        email: email.value,
      });
      console.log(data[0].username);

      if (data) {
        alert(`당신의 username은 ${data[0].username}입니다`);
      }
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
            <input type="email" value={email.value} onChange={email.onChange} />
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
