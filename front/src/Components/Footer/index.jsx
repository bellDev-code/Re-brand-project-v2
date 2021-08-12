import React from 'react';
import { FooterContainer, FooterBox, FooterWidget } from './styles';
import CopyRight from '../CopyRight';
import ContentsBox from './ContentsBox/';
import InfoBox from './Infobox/';
import NewsLetter from './NewsLetter';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterBox>
        <FooterWidget>
          <ContentsBox />
        </FooterWidget>
        <FooterWidget>
          <InfoBox />
        </FooterWidget>
        <FooterWidget></FooterWidget>
        <FooterWidget>
          <NewsLetter />
        </FooterWidget>
      </FooterBox>
      <CopyRight />
    </FooterContainer>
  );
};

export default Footer;
