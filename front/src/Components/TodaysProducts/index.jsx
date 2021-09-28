import React from 'react';
import { Container, BestBox, TextWrapper, ProductBox } from './styles';

const TodaysProducts = () => {
  return (
    <Container>
      <BestBox>
        <TextWrapper>
          <h2>CATEGORY</h2>
        </TextWrapper>
        <ProductBox></ProductBox>
      </BestBox>
    </Container>
  );
};

export default TodaysProducts;
