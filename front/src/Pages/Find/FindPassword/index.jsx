import useInput from '@Hooks/useInput';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

import { Container, AccountForm, InputWrapper, FindForm, ButtonWrapper, FindBtn } from './styles';

const FindPassword = () => {
  const history = useHistory();
  const email = useInput('fujifilm0517@naver.com');
  const verifyCode = useInput();
  const foundUsername = useInput();

  const changePassword = useInput();
  const reChangePassword = useInput();

  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const onSubmitSendEmail = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        // http://localhost:3000/api?query1=data&query2=data2"
        const { data } = await axios.post('http://localhost:4190/api/users/find/send?type=email', {
          payload: email.value,
        });

        if (data?.success) {
          setIsSendEmail(true);
          return;
        }

        throw new Error('알 수 없는 오류');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast(error.response.data.error);
        } else {
          toast(error.message);
        }
        setIsSendEmail(false);
      }
    },
    [email.value],
  );

  const onClickVerifyCode = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const { data } = await axios.post('http://localhost:4190/api/users/find/verify', {
          payload: email.value,
          code: verifyCode.value,
        });

        if (data?.success) {
          setIsVerified(true);
          foundUsername.setValue(data.username);
          return;
        }

        throw new Error(data?.error || '인증에 실패하였습니다.');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast(error.response.data.error);
        } else {
          toast(error.message);
        }
        setIsVerified(false);
      }
    },
    [email.value, verifyCode.value],
  );

  const onSubmitChangePassword = useCallback(
    async (e) => {
      e.preventDefault();

      if (!isVerified) {
        toast('인증 먼저 해주세요.');
        return;
      }

      if (changePassword.value !== reChangePassword.value) {
        toast('비밀번호가 서로 일치하지 않습니다.');
        return;
      }
      try {
        const { data } = await axios.post('http://localhost:4190/api/users/find/change?type=email', {
          payload: email.value,
          verifyCode: verifyCode.value,
          changePassword: changePassword.value,
        });
        if (data?.success) {
          toast('비밀번호가 변경 되었습니다. 다시 로그인해주세요.');
          history.push('/login');
          return;
        }
        throw new Error(data?.error || '비밀번호 변경에 실패하였습니다.');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast(error.response.data.error);
        } else {
          toast(error.message);
        }
      }
    },
    [history, isVerified, email.value, verifyCode.value, changePassword.value, reChangePassword.value],
  );

  return (
    <Container>
      <AccountForm>
        <h3>Find Password</h3>
        {isSendEmail ? (
          <FindForm onSubmit={onSubmitChangePassword}>
            <InputWrapper>
              <label>Verify Code</label>
              <input type="text" value={verifyCode.value} onChange={verifyCode.onChange} />
            </InputWrapper>
            <button onClick={onClickVerifyCode}>인증</button>
            {isVerified && <p>인증되었습니다.</p>}
            <InputWrapper>
              <label>Change Password</label>
              <input type="password" value={changePassword.value} onChange={changePassword.onChange} />
            </InputWrapper>
            <InputWrapper>
              <label>ReChange Password</label>
              <input type="password" value={reChangePassword.value} onChange={reChangePassword.onChange} />
            </InputWrapper>
            <ButtonWrapper>
              <FindBtn type="submit">Verify</FindBtn>
            </ButtonWrapper>
          </FindForm>
        ) : (
          <FindForm onSubmit={onSubmitSendEmail}>
            <InputWrapper>
              <label>Email</label>
              <input type="email" value={email.value} onChange={email.onChange} />
            </InputWrapper>
            <ButtonWrapper>
              <FindBtn type="submit">EMAIL SEND</FindBtn>
            </ButtonWrapper>
          </FindForm>
        )}
      </AccountForm>
    </Container>
  );
};

export default FindPassword;
