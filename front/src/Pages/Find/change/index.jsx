import useInput from '@Hooks/useInput';
import axios from 'axios';
import React from 'react';
import { Container, AccountForm, FindForm, InputWrapper, ButtonWrapper, FindBtn } from './styles';

const FindPassword = () => {
  const username = useInput('');
  const findResult = useInput('');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:4190/api/users/change', {
        username: username.value,
      });

      console.log(data);
      if (data) {
        findResult.setValue();
        return;
      }
      throw new Error('알 수 없는 오류');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <AccountForm>
        <h3>Find Password</h3>
        <FindForm onSubmit={onSubmit}>
          <InputWrapper>
            <label>username</label>
            <input type="text" value={username.value} onChange={username.onChange} />
          </InputWrapper>
          <ButtonWrapper>
            {findResult.value && <input type="password"></input>}
            <FindBtn type="submit">Find</FindBtn>
          </ButtonWrapper>
        </FindForm>
      </AccountForm>
    </Container>
  );
};

export default FindPassword;
