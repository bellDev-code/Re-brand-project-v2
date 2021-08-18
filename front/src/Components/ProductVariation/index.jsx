import React from 'react';
import {
  Container,
  VariationBox,
  ProductBox,
  Item_one,
  Item_two,
  OneItem,
  TwoItem,
  MiddleWrapper,
  ShopBtn,
} from './styles';

import ItemImgOne from '@Assets/Layouts/Banner/Product Variation/vacance.png';
import ItemImgTwo from '@Assets/Layouts/Banner/Product Variation/summer.png';
import ItemImgThree from '@Assets/Layouts/Banner/Product Variation/offer.png';
import ItemImgFour from '@Assets/Layouts/Banner/Product Variation/arrivals.png';
import ItemImgFive from '@Assets/Layouts/Banner/Product Variation/sale.png';

const ProductVariation = () => {
  return (
    <Container>
      <VariationBox>
        <ProductBox>
          <Item_one>
            <img src={ItemImgOne} />
            <OneItem>
              <h4>VACANCE</h4>
              <h2>HOT</h2>
              <h3>COLLECTION</h3>
              <ShopBtn type="text">SHOP NOW</ShopBtn>
            </OneItem>
          </Item_one>
          <Item_one>
            <img src={ItemImgTwo} />
            <TwoItem>
              <h4>SUMMER</h4>
              <h2>HOT</h2>
              <h3>COLLECTION</h3>
              <ShopBtn type="text">SHOP NOW</ShopBtn>
            </TwoItem>
          </Item_one>
        </ProductBox>
        <ProductBox>
          <Item_two>
            <img src={ItemImgThree} />
            <MiddleWrapper>
              <h2>10% OFFER</h2>
              <ShopBtn type="text">SHOP NOW</ShopBtn>
            </MiddleWrapper>
          </Item_two>
        </ProductBox>
        <ProductBox>
          <Item_one>
            <img src={ItemImgFour} />
            <TwoItem>
              <h4>COOL</h4>
              <h2>ARRIVALS</h2>
              <h3>COLLECTION</h3>
              <ShopBtn type="text">SHOP NOW</ShopBtn>
            </TwoItem>
          </Item_one>
          <Item_one>
            <img src={ItemImgFive} />
            <OneItem>
              <h4>COOL</h4>
              <h2>SALE</h2>
              <h3>COLLECTION</h3>
              <ShopBtn type="text">SHOP NOW</ShopBtn>
            </OneItem>
          </Item_one>
        </ProductBox>
      </VariationBox>
    </Container>
  );
};

export default ProductVariation;
