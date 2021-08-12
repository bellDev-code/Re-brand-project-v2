import React from 'react';
import { Container, VariationBox, ProductBox } from './styles';

const ProductVariation = () => {
  return (
    <Container>
      <VariationBox>
        <ProductBox>
          <div>1</div>
          <div>2</div>
        </ProductBox>
        <ProductBox>3</ProductBox>
        <ProductBox>
          <div>4</div>
          <div>5</div>
        </ProductBox>
      </VariationBox>
    </Container>
  );
};

export default ProductVariation;
