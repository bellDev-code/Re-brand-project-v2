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

  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const onSubmitSendEmail = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const { data } = await axios.post('http://localhost:4190/api/users/password', {
          email: email.value,
        });

        if (!data?.success) {
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

  const onClickToChange = useCallback(() => {
    history.push(`/change/${foundUsername.value}`);
  }, [history, foundUsername.value]);

  const onSubmitVerifyCode = useCallback(
    async (e) => {
      e.preventDefault();
      const code = e.target[0].value;

      try {
        const { data } = await axios.post('http://localhost:4190/api/users/find/verify', {
          payload: email.value,
          code: code,
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
    [email.value],
  );

  return (
    <Container>
      <AccountForm>
        <h3>Find Password</h3>
        {isVerified ? (
          <FindForm>
            <ButtonWrapper>
              <FindBtn onClick={onClickToChange}>비밀번호 변경하기</FindBtn>
            </ButtonWrapper>
          </FindForm>
        ) : isSendEmail ? (
          <FindForm onSubmit={onSubmitVerifyCode}>
            <InputWrapper>
              <label>Verify Code</label>
              <input type="text" value={verifyCode.value} onChange={verifyCode.onChange} />
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
