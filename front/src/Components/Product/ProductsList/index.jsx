import React from 'react';
import { Container } from './styles';
import PropTypes from 'prop-types';
import ProductItem from '../ProductItem';

const ProductsList = ({ list }) => {
  return (
    <Container>
      {list.map((product) => {
        return <ProductItem key={product.id} item={product} />;
      })}
    </Container>
  );
};

ProductsList.propTypes = {
  list: PropTypes.array,
};

export default ProductsList;
