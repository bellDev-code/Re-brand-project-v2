import { API_URL } from '@Constants/environments';
import useSelector from '@Hooks/useSelector';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useCallback, useState } from 'react';
import { Container } from './styles';

const ProductFilter = ({ onChange }) => {
  const [categories, setCategories] = useState();

  const getCategories = useCallback(async () => {
    try {
      // 다른 http 프로토콜은 다를 수 있다.
      const result = await axios({
        method: 'GET',
        url: API_URL + '/categories',
      });

      setCategories(result.data);
      
    } catch (error) {
      console.log(error);
    }
  }, []);

  const cSelector1 = useSelector(categories);
  const cSelector2 = useSelector([
    {
      name: '폰',
      id: 'phone',
    },
    {
      name: '커피',
      id: 'coffee',
    },
  ]);

  useEffect(() => {
    getCategories();
  }, []);

  console.log('categories', categories);

  const onClick = () => {
    const params = {
      categoryId: cSelector1.value
    };

    onChange(params);
  };

  return (
    <Container>
      {cSelector1.render()}
      {/* <Selector />
      <Selector />
      <Selector /> */}
      <button onClick={onClick}>적용</button>
    </Container>
  );
};

ProductFilter.propTypes = {
  onChange: PropTypes.func,
};

export default ProductFilter;
