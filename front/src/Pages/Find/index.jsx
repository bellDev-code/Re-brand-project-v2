import React from 'react';
import axios from 'axios';
import { Container, AccountForm, FindForm, InputWrapper, ButtonWrapper, FindBtn } from './styles';
import useInput from '@Hooks/useInput';

const Find = () => {
  const email = useInput('sumaoo20@naver.com');
  const findResult = useInput('');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:4190/api/users/find', {
        email: email.value,
      });
      if (data) {
        findResult.setValue(`당신의 username은 ${data.username}입니다`);
        return;
      }
      throw new Error('알 수 없는 오류');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        findResult.setValue(error.response.data);
      } else {
        findResult.setValue(error.message);
      }
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
          {findResult.value && <h3>{findResult.value}</h3>}
          <ButtonWrapper>
            <FindBtn type="submit">Find</FindBtn>
          </ButtonWrapper>
        </FindForm>
      </AccountForm>
    </Container>
  );
};

export default Find;
