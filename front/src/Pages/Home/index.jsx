import BestProducts from '@Components/BestProducts';
import HomeBanner from '@Components/Banner';
import InstagramArea from '@Components/InstagramArea';
import ProductVariation from '@Components/ProductVariation';
import TodayProducts from '@Components/TodaysProducts';
import TrendingNewFashion from '@Components/TrendingNew';
import React from 'react';
import { Container } from './styles';

const Home = () => {
  return (
    <Container>
      <HomeBanner />
      <ProductVariation />
      <BestProducts />
      <TodayProducts />
      <TrendingNewFashion />
      <InstagramArea />
    </Container>
  );
};

export default Home;
