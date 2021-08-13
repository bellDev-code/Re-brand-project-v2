import React from 'react';
import { Container, BestBox, TextWrapper, ProductBox } from './styles';

const BestProducts = () => {
  return (
    <Container>
      <BestBox>
        <TextWrapper>
          <h2>THE BEST PRODUCT</h2>
        </TextWrapper>
        <ProductBox></ProductBox>
      </BestBox>
    </Container>
  );
};

export default BestProducts;
