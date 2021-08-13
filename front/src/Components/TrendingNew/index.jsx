import React from 'react';
import { Container, TrendingBox, TextWrapper, TrendingBtn } from './styles';

const TrendingNewFashion = () => {
  return (
    <Container>
      <TrendingBox>
        <TextWrapper>
          <h5>Trending</h5>
          <h2>New Fashion</h2>
          <p>Experience the worlds Finest fashion Trend</p>
          <TrendingBtn type="text">SHOP NOW</TrendingBtn>
        </TextWrapper>
      </TrendingBox>
    </Container>
  );
};

export default TrendingNewFashion;
