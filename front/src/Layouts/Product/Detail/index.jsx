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
  ProductDetails,
} from './styles';
import TestImage from '@Assets/Layouts/blanc.jpeg';
import SwiperImage from '@Components/SwiperImage';
import { convertToWon, salePercent } from '@Utils/number';

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState();

  useEffect(async () => {
    const product = await getProduct(id);

    // console.log(product);
    setProduct(product);
  }, []);

  if (!product) {
    return <div style={{ height: '100vh' }}></div>;
  }

  return (
    <Container>
      <ItemBox>
        <ItemTitle>{product.name}</ItemTitle>
        <ItemBrand>{product.brand.name}</ItemBrand>
        <Wrapper>
          <ImageWrapper>
            <MainImage src={product.thumbnail ? product.thumbnail.url : TestImage} alt="thumbnail"></MainImage>
            <SwiperImage images={product.images || []} alt="productImages" />
          </ImageWrapper>
          <ProductInfoWrapper>
            <PriceWrapper>
              <SalePercent>할인율 : {salePercent(product.sale)}</SalePercent>
              <ItemPrice>{convertToWon(product.price)}</ItemPrice>
            </PriceWrapper>
            <ProductDetails>
              <div>{product.info.color}</div>
              <div>{product.detail.material}</div>
            </ProductDetails>
          </ProductInfoWrapper>
        </Wrapper>
      </ItemBox>
    </Container>
  );
};

export default withRouter(ProductDetail);
