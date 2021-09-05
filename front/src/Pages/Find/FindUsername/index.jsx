import React, { useCallback, useMemo, useState } from 'react';
import axios from 'axios';
import { Container, AccountForm, FindForm, InputWrapper, ButtonWrapper, FindBtn } from './styles';
import useInput from '@Hooks/useInput';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

const Find = () => {
  const history = useHistory();

  const email = useInput('fujifilm0517@naver.com');
  const verifyCode = useInput();
  const foundUsername = useInput();

  const foundDescription = useMemo(() => {
    // 성능 최적화
    if (!foundUsername.value) {
      return null;
    }
    return `당신의 username은 ${foundUsername.value}입니다`;
  }, [foundUsername.value]);

  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const onSubmitSendEmail = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const { data } = await axios.post('http://localhost:4190/api/users/find', {
          email: email.value,
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

  const onClickChange = useCallback(() => {
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

      console.log(code);
    },
    [email.value],
  );

  const onClickToLogin = useCallback(() => {
    history.push('/login');
  }, [history]);

  const onClickToForgetPassword = useCallback(() => {
    history.push('/find/password');
  }, [history]);
  return (
    <Container>
      <AccountForm>
        <h3>Find User</h3>
        {isVerified ? (
          <FindForm>
            {foundDescription && <h3>{foundDescription}</h3>}
            <ButtonWrapper>
              <FindBtn onClick={onClickToLogin}>로그인 하러가기</FindBtn>
              <FindBtn onClick={onClickToForgetPassword}>비밀번호 찾기</FindBtn>
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
            {foundDescription && <button onClick={onClickChange}>비밀번호 변경하기</button>}
            <ButtonWrapper>
              <FindBtn type="submit">EMAIL SEND</FindBtn>
            </ButtonWrapper>
          </FindForm>
        )}
      </AccountForm>
    </Container>
  );
};

export default Find;
