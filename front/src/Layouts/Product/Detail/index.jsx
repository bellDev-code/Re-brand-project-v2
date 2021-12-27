import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { getProduct } from '@Api/product';
import {
  Container,
  ItemBox,
  ItemBrand,
  ItemTitle,
  ImageWrapper,
  MainImage,
  Wrapper,
  ItemPrice,
  SalePercent,
  PriceWrapper,
  ProductInfoWrapper,
} from './styles';

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState();

  useEffect(async () => {
    const product = await getProduct(id);

    console.log(product);
    setProduct(product);
  }, []);

  return (
    <Container>
      <ItemBox>
        <ItemTitle>{product?.name}</ItemTitle>
        <ItemBrand>{product?.brand.name}</ItemBrand>
        <Wrapper>
          <ImageWrapper>
            <MainImage></MainImage>
          </ImageWrapper>
          <ProductInfoWrapper>
            <PriceWrapper>
              <SalePercent>{product?.sale}</SalePercent>
              <ItemPrice>{product?.price}</ItemPrice>
            </PriceWrapper>
            <div>{product?.info.color}</div>
            <div>{product?.detail.material}</div>
          </ProductInfoWrapper>
        </Wrapper>
      </ItemBox>
    </Container>
  );
};

export default withRouter(ProductDetail);
