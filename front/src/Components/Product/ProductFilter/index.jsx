import Selector from '@Components/Selector';
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

  // const [filterParams, setFilterParams] = useState({});

  // 서버에 요청할 state
  const [selectCategory, setSelectCategory] = useState();

  useEffect(() => {
    getCategories();
  }, []);

  console.log('categories', categories);

  const onClick = () => {
    const params = {
      category1: cSelector1.value,
      category2: cSelector2.value,
    };

    onChange(params);
  };

  return (
    <Container>
      {cSelector1.render()}
      {cSelector2.render()}
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
