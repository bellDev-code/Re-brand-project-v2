import React from 'react';
import styled from '@emotion/styled';
import { IoLogoInstagram } from 'react-icons/io';
import { FaFacebookF } from 'react-icons/fa';

const ContentsArea = styled.div`
  & > p {
    padding: 15px 50px 0 0;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    color: #777c87;
  }
`;

const SnsBox = styled.div`
  & > svg {
    font-size: 23px;
    margin: 5px;
  }
`;

const ContentsBox = () => {
  return (
    <ContentsArea>
      <h1>Re:brand</h1>
      <p>No. 1 luxury rental platform in Korea. We will accompany you until the day when everyone can be happy.</p>
      <SnsBox>
        <FaFacebookF />
        <IoLogoInstagram />
      </SnsBox>
    </ContentsArea>
  );
};

export default ContentsBox;
