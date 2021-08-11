import React from 'react';
import { FooterContainer, FooterBox, FooterWidget } from './styles';
import CopyRight from './copyRight';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterBox>
        <FooterWidget>one</FooterWidget>
        <FooterWidget>two</FooterWidget>
        <FooterWidget>three</FooterWidget>
        <FooterWidget>four</FooterWidget>
      </FooterBox>
      <CopyRight />
    </FooterContainer>
  );
};

export default Footer;
