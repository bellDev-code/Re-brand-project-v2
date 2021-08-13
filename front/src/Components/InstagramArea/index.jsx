import React from 'react';
import { Container, InstaBox, TextWrapper, SvgWrapper } from './styles';
import { IoLogoInstagram } from 'react-icons/io';

const InstagramArea = () => {
  return (
    <Container>
      <InstaBox>
        <TextWrapper>
          <h2>FOLLOW US INSTAGRAM</h2>
          <SvgWrapper>
            <p>
              <IoLogoInstagram />
              rebrand_seoul
            </p>
          </SvgWrapper>
        </TextWrapper>
      </InstaBox>
    </Container>
  );
};

export default InstagramArea;
