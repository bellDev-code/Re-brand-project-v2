import React, { useCallback, useMemo } from 'react';
import axios from 'axios';
import { Container, AccountForm, FindForm, InputWrapper, ButtonWrapper, FindBtn } from './styles';
import useInput from '@Hooks/useInput';
import { useHistory } from 'react-router';

const Find = () => {
  const history = useHistory();

  const email = useInput('sumaoo20@naver.com');
  const foundUsername = useInput();

  const foundDescription = useMemo(() => {
    // 성능 최적화
    if (!foundUsername.value) {
      return null;
    }
    return `당신의 username은 ${foundUsername.value}입니다`;
  }, [foundUsername.value]);

  const findError = useInput();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const { data } = await axios.post('http://localhost:4190/api/users/find', {
          email: email.value,
        });
        if (data) {
          foundUsername.setValue(data.username);
          findError.setValue('');
          return;
        }
        throw new Error('알 수 없는 오류');
      } catch (error) {
        foundUsername.setValue('');
        if (axios.isAxiosError(error)) {
          findError.setValue(error.response.data);
        } else {
          findError.setValue(error.message);
        }
      }
    },
    [email.value],
  );

  const onClickChange = useCallback(() => {
    history.push(`/change/${foundUsername.value}`);
  }, [history, foundUsername.value]);

  return (
    <Container>
      <AccountForm>
        <h3>Find User</h3>
        <FindForm onSubmit={onSubmit}>
          <InputWrapper>
            <label>Email</label>
            <input type="email" value={email.value} onChange={email.onChange} />
          </InputWrapper>
          {foundDescription && <h3>{foundDescription}</h3>}
          {findError.value && <h3>{findError.value}</h3>}
          {foundDescription && <button onClick={onClickChange}>비밀번호 변경하기</button>}
          <ButtonWrapper>
            <FindBtn type="submit">Find</FindBtn>
          </ButtonWrapper>
        </FindForm>
      </AccountForm>
    </Container>
  );
};

export default Find;
