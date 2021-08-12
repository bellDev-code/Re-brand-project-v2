import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
`;

const SendMailForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SendInput = styled.input`
  border: 1px solid #ddd;
  border-color: #ddd;
  min-height: 45px;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  width: 100%;
`;

const SubmitBtn = styled.button`
  margin-top: 20px;
  background-color: #000;
  color: #fff;
  padding: 16px 35px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-radius: 1.5px;
  box-shadow: 1.5px 1.5px 1.5px lightgrey;
  border: none;
  cursor: pointer;
`;

const ButtonWrap = styled.div``;

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
