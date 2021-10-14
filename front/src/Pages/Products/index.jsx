import ProductBanner from '@Components/Banner/ProductBanner';
import Category from '@Components/Category';
import ProductsList from '@Components/ProductsList';
import React from 'react';
import { Container, Wrapper } from './styles';

const Product = () => {
  return (
    <Container>
      <ProductBanner />
      <Wrapper>
        <Category />
        <ProductsList />
      </Wrapper>
    </Container>
  );
};

export default Product;
