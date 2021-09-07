import useInput from '@Hooks/useInput';
import { passwordRegex } from '@Utils/regex';
import axios from 'axios';
import React, { useCallback } from 'react';
import { useHistory, withRouter, useParams, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, AccountForm, InputWrapper, ButtonWrapper, FindBtn, ChangeForm } from './styles';

const ChangePassword = () => {
  const params = useParams();

  const { username: usernameParam } = params;
  if (!usernameParam) {
    return <Redirect to="/login" />;
  }

  const findResult = useInput('');
  const password = useInput('');
  const passwordConfirm = useInput('');
  const history = useHistory();

  const changeSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const { data } = await axios.post('http://localhost:4190/api/users/change', {
          password: password.value,
          username: usernameParam,
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
    [password.value, passwordConfirm.value],
  );

  return (
    <Container>
      <AccountForm>
        <h3>Change Password</h3>
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

export default withRouter(ChangePassword);
