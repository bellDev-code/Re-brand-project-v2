import React from 'react';
import { Container, BestBox, TextWrapper, ProductBox } from './styles';

const TodaysProducts = () => {
  return (
    <Container>
      <BestBox>
        <TextWrapper>
          <h2>TODAY DEALS</h2>
        </TextWrapper>
        <ProductBox></ProductBox>
      </BestBox>
    </Container>
  );
};

export default TodaysProducts;
