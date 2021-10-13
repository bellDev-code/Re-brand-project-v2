import ProductBanner from '@Components/Banner/ProductBanner';
import Filter from '@Components/Filter';
import ProductsList from '@Components/ProductsList';
import React from 'react';
import { Container, Wrapper } from './styles';

const Product = () => {
  return (
    <Container>
      <ProductBanner />
      <Wrapper>
        <Filter />
        <ProductsList />
      </Wrapper>
    </Container>
  );
};

export default Product;
