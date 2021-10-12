import React from 'react';
import { Container, BannerBox, BannerTitle, BannerSubTitle } from './styles';

const HomeBanner = () => {
  return (
    <Container>
      <BannerBox>
        <BannerTitle>
          <h1>
            Live For
            <br />
            <span>FASHION</span>
          </h1>
        </BannerTitle>
        <BannerSubTitle>SAVE UP TO 50%</BannerSubTitle>
      </BannerBox>
    </Container>
  );
};

export default HomeBanner;
