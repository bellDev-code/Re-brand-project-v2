import React from 'react';
import PropTypes from 'prop-types';
import TempImage from '@Assets/Instagram/post2.png';
import { Container, ProductImage, ItemWrapper, ItemTitle, ItemPrice, BrandName } from './styles';
import { Link } from 'react-router-dom';

const ProductItem = ({ item }) => {
  // console.log(item);
  return (
    <Container>
      <Link to={`product/${item.id}`}>
        <div>
          <ProductImage src={item.thumbnail ? item.thumbnail.url : TempImage} />
        </div>
        <ItemWrapper>
        <ItemTitle>{item.name}</ItemTitle>
        <ItemPrice>{item.price}</ItemPrice>
        <BrandName>{item.brand.name}</BrandName>
        </ItemWrapper>
      </Link>
    </Container>
  );
};

ProductItem.propTypes = {
  item: PropTypes.object,
};

export default ProductItem;
