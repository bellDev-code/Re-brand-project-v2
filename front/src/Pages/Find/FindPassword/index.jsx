import useInput from '@Hooks/useInput';
import axios from 'axios';
import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

import { Container, AccountForm, InputWrapper, FindForm, ButtonWrapper, FindBtn } from './styles';

const FindPassword = () => {
  const history = useHistory();
  const email = useInput('fujifilm0517@naver.com');
  const password = useInput('');
  const verifyCode = useInput();
  const foundPassword = useInput();

  const foundDescription = useMemo(() => {
    // 성능 최적화
    if (!foundPassword.value) {
      return null;
    }
    return `당신의 password는 ${foundPassword.value}입니다`;
  }, [foundPassword.value]);

  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const onSubmitSendEmail = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const { data } = await axios.post('http://localhost:4190/api/users/password', {
          email: email.value,
          password: password.value,
        });

        console.log(data.password);

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
    [email.value, password.value],
  );

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
          foundPassword.setValue(data.password);
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

      // console.log(code);
    },
    [email.value],
  );

  const onClickToLogin = useCallback(() => {
    history.push('/login');
  }, [history]);

  return (
    <Container>
      <AccountForm>
        <h3>Find Password</h3>
        {isVerified ? (
          <FindForm>
            {foundDescription && <h3>{foundDescription}</h3>}
            <ButtonWrapper>
              <FindBtn onClick={onClickToLogin}>로그인 하러가기</FindBtn>
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
            {foundDescription && <h3>{foundDescription}</h3>}
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
