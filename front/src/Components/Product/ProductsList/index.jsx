import React from 'react';
import { Container } from './styles';
import PropTypes from 'prop-types';
import ProductItem from '../ProductItem';

const ProductsList = ({ list, conditions }) => {
  console.log(conditions, 'url');
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
  conditions: PropTypes.string,
};

export default ProductsList;
