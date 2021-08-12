import BestProducts from '@Components/BestProducts';
import HomeBanner from '@Components/HomeBanner';
import InstagramArea from '@Components/InstargramArea';
import ProductVariation from '@Components/ProductVariation';
import TodayProducts from '@Components/TodaysProducts';
import React from 'react';
import { Container } from './styles';

const Home = () => {
  return (
    <Container>
      <HomeBanner />
      <ProductVariation />
      <BestProducts />
      <TodayProducts />
      <InstagramArea />
    </Container>
  );
};

export default Home;
