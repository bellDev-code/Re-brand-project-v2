import useInput from '@Hooks/useInput';
import { passwordRegex } from '@Utils/regex';
import axios from 'axios';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, AccountForm, FindForm, InputWrapper, ButtonWrapper, FindBtn, ChangeForm } from './styles';

const ChangePassword = () => {
  const username = useInput('');
  const findResult = useInput('');
  const password = useInput('');
  const passwordConfirm = useInput('');
  const history = useHistory();

  const findPassword = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const { data } = await axios.post('http://localhost:4190/api/users/password', {
          username: username.value,
        });

        if (data) {
          findResult.setValue(data);
          return;
        }
        throw new Error('알 수 없는 오류');
      } catch (error) {
        console.log(error.message);
      }
    },
    [username.value],
  );

  const changeSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const { data } = await axios.post('http://localhost:4190/api/users/change', {
          password: password.value,
          username: username.value,
        });

        console.log(data);

        if (!password.value) {
          toast('비밀번호를 입력하세요.');
          return;
        }

        if (!passwordRegex.test(password.value)) {
          toast('비밀번호는 특수문자를 포함한 9~30자로 가능합니다.');
          return;
        }

        if (password.value !== passwordConfirm.value) {
          toast('비밀번호가 서로 일치하지 않습니다.');
          return;
        }

        if (data?.success) {
          history.push('/login');
        }
      } catch (error) {
        toast(error.response?.data?.error);
        console.log(error.response);
      }
    },
    [password.value, username.value, passwordConfirm.value],
  );

  return (
    <Container>
      <AccountForm>
        <h3>Change Password</h3>
        <FindForm onSubmit={findPassword}>
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

export default ChangePassword;
