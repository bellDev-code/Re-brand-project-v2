import React, { useCallback } from 'react';
import { Container, AccountForm, RegisterForm, InputWrapper, ButtonWrapper, RegisterBtn } from './styles';
import useInput from '@Hooks/useInput';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { emailRegex, idRegex, nickNameRegex, passwordRegex } from '@Utils/regex';

const Register = () => {
  const history = useHistory();

  const username = useInput('');
  const email = useInput('');
  const password = useInput('');
  const passwordConfirm = useInput('');
  const name = useInput('');
  const phoneNumber = useInput('');

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!username.value) {
        toast('아이디를 입력하세요.');
        return;
      }

      if (!idRegex.test(username.value)) {
        toast('아이디는 영소문자, 숫자를 조합한 5~20자로 가능합니다');
        return;
      }

      if (!name.value) {
        toast('이름을 입력하세요.');
        return;
      }

      if (!nickNameRegex.test(name.value)) {
        toast('닉네임은 영대소문자, 한글, 숫자, 특수문자(".", "_", "-")를 사용한 2~16자로 가능합니다.');
        return;
      }

      if (!email.value) {
        toast('이메일을 입력하세요.');
        return;
      }

      if (!emailRegex.test(email.value)) {
        toast('이메일 형식이 올바르지 않습니다.');
        return;
      }

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

      try {
        const { data } = await axios.post('http://localhost:4190/api/users', {
          username: username.value,
          password: password.value,
          email: email.value,
          name: name.value,
          phoneNumber: phoneNumber.value,
        });
        // console.log(data);

        if (data?.success) {
          history.push('/login');
        }
      } catch (error) {
        toast(error.response?.data?.error);
        console.log(error.response);
      }
    },
    [username.value, password.value, email.value, name.value, passwordConfirm.value, phoneNumber.value],
  );

  const checkUsername = useCallback(async () => {
    try {
      const { data } = await axios.post('http://localhost:4190/api/users/check?type=username', {
        payload: username.value,
      });

      if (data?.success) {
        username.setError('');
      }
    } catch (error) {
      console.log(error);
      username.setError(error.response?.data?.error);
    }
  }, [username.value]);

  const checkEmail = useCallback(async () => {
    try {
      const { data } = await axios.post('http://localhost:4190/api/users/check?type=email', {
        payload: email.value,
      });

      if (data?.success) {
        email.setError('');
      }
    } catch (error) {
      console.log(error);
      email.setError(error.response?.data?.error);
    }
  }, [email.value]);

  return (
    <Container>
      <AccountForm>
        <h3>Register</h3>
        <RegisterForm onSubmit={onSubmit}>
          <InputWrapper>
            <label>Username</label>
            <input type="text" value={username.value} onChange={username.onChange} onBlur={checkUsername} />
            <label>{username.error}</label>
          </InputWrapper>
          <InputWrapper>
            <label>name</label>
            <input type="text" value={name.value} onChange={name.onChange} />
          </InputWrapper>
          <InputWrapper>
            <label>email</label>
            <input type="email" value={email.value} onChange={email.onChange} onBlur={checkEmail} />
            <label>{email.error}</label>
          </InputWrapper>
          <InputWrapper>
            <label>phoneNumber</label>
            <input type="tel" value={phoneNumber.value} onChange={phoneNumber.onChange} placeholder="Ex) 01012341234" />
            <label>{phoneNumber.error}</label>
          </InputWrapper>
          <InputWrapper>
            <label>Password</label>
            <input type="password" value={password.value} onChange={password.onChange} />
          </InputWrapper>
          <InputWrapper>
            <label>Password Confirm</label>
            <input type="password" value={passwordConfirm.value} onChange={passwordConfirm.onChange} />
          </InputWrapper>
          <ButtonWrapper>
            <RegisterBtn type="submit">Register</RegisterBtn>
          </ButtonWrapper>
        </RegisterForm>
      </AccountForm>
    </Container>
  );
};

export default Register;
