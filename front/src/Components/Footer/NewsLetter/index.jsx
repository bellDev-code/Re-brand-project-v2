import React from 'react';
import { Container, SendMailForm, SendInput, ButtonWrap, SubmitBtn } from './styles';

const NewsLetter = () => {
  return (
    <Container>
      <h3>NEWSLETTER</h3>
      <SendMailForm>
        <SendInput type="email" placeholder="Your Mail*" />
        <ButtonWrap>
          <SubmitBtn type="submit">SEND MAIL</SubmitBtn>
        </ButtonWrap>
      </SendMailForm>
    </Container>
  );
};

export default NewsLetter;
