import useInput from '@Hooks/useInput';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import { Container, AccountForm, FindForm, InputWrapper, ButtonWrapper, FindBtn, ChangeForm } from './styles';

const FindPassword = () => {
  const username = useInput('');
  const findResult = useInput('');
  const password = useInput('');
  const passwordConfirm = useInput('');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:4190/api/users/password', {
        username: username.value,
      });

      console.log(data);

      if (data) {
        findResult.setValue(data);
        return;
      }
      throw new Error('알 수 없는 오류');
    } catch (error) {
      console.log(error.message);
    }
  };

  const changeSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post('http://localhost:4190/api/users/change', {
      password: password.value,
    });

    console.log(data);

    if (password.value !== passwordConfirm.value) {
      toast('비밀번호가 서로 일치하지 않습니다.');
      return;
    }
  };

  return (
    <Container>
      <AccountForm>
        <h3>Change Password</h3>
        <FindForm onSubmit={onSubmit}>
          <InputWrapper>
            <label>username</label>
            <input type="text" value={username.value} onChange={username.onChange} />
          </InputWrapper>

          <ButtonWrapper>
            <FindBtn type="submit">Find</FindBtn>
          </ButtonWrapper>
        </FindForm>
        <ChangeForm onSubmit={changeSubmit}>
          <InputWrapper>
            {findResult.value && (
              <input type="password" value={findResult.value} onChange={findResult.onChange}></input>
            )}
            <label>Change password</label>
            <input type="password" value={password.value} onChange={password.onChange} />
          </InputWrapper>
          <InputWrapper>
            <label>Password Confirm</label>
            <input type="password" value={passwordConfirm.value} onChange={passwordConfirm.onChange} />
          </InputWrapper>
          <ButtonWrapper>
            <FindBtn type="submit">Change</FindBtn>
          </ButtonWrapper>
        </ChangeForm>
      </AccountForm>
    </Container>
  );
};

export default FindPassword;
