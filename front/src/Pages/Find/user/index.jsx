import React, { useCallback } from 'react';
import axios from 'axios';
import { Container, AccountForm, FindForm, InputWrapper, ButtonWrapper, FindBtn } from './styles';
import useInput from '@Hooks/useInput';
import { Link } from 'react-router-dom';

const Find = () => {
  const email = useInput('sumaoo20@naver.com');
  const findResult = useInput('');

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [input])

  //   const doubleEmail = useMemo(() => {
  //     let result = '';

  //     for (let i = 0; i < email.value.length; i++) {
  //       result += email.value[i] * i;
  //     }

  //     return result;
  //   }, [email.value, findResult.value]);

  //   console.log(doubleEmail);
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const { data } = await axios.post('http://localhost:4190/api/users/find', {
          email: email.value,
        });
        if (data) {
          findResult.setValue(`당신의 username은 ${data.username}입니다`);
          return;
        }
        throw new Error('알 수 없는 오류');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          findResult.setValue(error.response.data);
        } else {
          findResult.setValue(error.message);
        }
      }
    },
    [email.value],
  );

  return (
    <Container>
      <AccountForm>
        <h3>Find User</h3>
        <FindForm onSubmit={onSubmit}>
          <InputWrapper>
            <label>Email</label>
            <input type="email" value={email.value} onChange={email.onChange} />
          </InputWrapper>
          {findResult.value && <h3>{findResult.value}</h3>}
          {findResult.value && <Link to="/change">비밀번호 변경하기</Link>}
          <ButtonWrapper>
            <FindBtn type="submit">Find</FindBtn>
            {/* {doubleEmail} */}
          </ButtonWrapper>
        </FindForm>
      </AccountForm>
    </Container>
  );
};

export default Find;
