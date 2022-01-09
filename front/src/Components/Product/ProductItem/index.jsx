import React from 'react';
import PropTypes from 'prop-types';
import TempImage from '@Assets/Instagram/post2.png';
import { Container, ProductImage } from './styles';
import { Link } from 'react-router-dom';

const ProductItem = ({ item }) => {
  // console.log(item);
  return (
    <Container>
      <Link to={`product/${item.id}`}>
        <div>
          <ProductImage src={item.thumbnail ? item.thumbnail.url : TempImage} />
        </div>
        <div>{item.name}</div>
        <div>{item.price}</div>
        <div>{item.brand.name}</div>
      </Link>
    </Container>
  );
};

ProductItem.propTypes = {
  item: PropTypes.object,
};

export default ProductItem;
