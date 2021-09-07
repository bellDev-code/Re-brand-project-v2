import useInput from '@Hooks/useInput';
import React, { useCallback } from 'react';

import { Container, AccountForm, InputWrapper, FindForm, ButtonWrapper, FindBtn } from './styles';

const FindPassword = () => {
  const email = useInput('fujifilm0517@naver.com');

  const onSubmitSendEmail = useCallback(async (e) => {
    e.preventDefault();
  }, []);

  return (
    <Container>
      <AccountForm>
        <h3>Find Password</h3>
        <FindForm>
          <InputWrapper onSubmit={onSubmitSendEmail}>
            <label>E-mail을 적어주세요</label>
            <input type="email" value={email.value} />
          </InputWrapper>
          <ButtonWrapper>
            <FindBtn type="submit">SEND EMAIL</FindBtn>
          </ButtonWrapper>
        </FindForm>
      </AccountForm>
    </Container>
  );
};

export default FindPassword;
