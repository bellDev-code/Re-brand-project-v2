import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { getProduct } from '@Api/product';

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState();

  useEffect(async () => {
    const product = await getProduct(id);
    setProduct(product);
  }, []);

  return <div>{product?.name}</div>;
};

export default withRouter(ProductDetail);
