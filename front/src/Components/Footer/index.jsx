import React from 'react';
import { FooterContainer, FooterBox, FooterWidget } from './styles';
import CopyRight from '../CopyRight';
import { ContentsBox, InfoBox, SnsBox } from './styles';
import { IoLogoInstagram } from 'react-icons/io';
import { FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterBox>
        <FooterWidget>
          <ContentsBox>
            <div>이미지</div>
            <p>
              No. 1 luxury rental platform in Korea. We will accompany you until the day when everyone can be happy.
            </p>
            <SnsBox>
              <FaFacebookF />
              <IoLogoInstagram />
            </SnsBox>
          </ContentsBox>
        </FooterWidget>
        <FooterWidget>
          <InfoBox></InfoBox>
        </FooterWidget>
        <FooterWidget>three</FooterWidget>
        <FooterWidget>four</FooterWidget>
      </FooterBox>
      <CopyRight />
    </FooterContainer>
  );
};

export default Footer;
