import ProductBanner from '@Components/Banner/ProductBanner';
import ProductsList from '@Components/Product/ProductsList';
import React, { useEffect, useMemo, useState } from 'react';
import { withRouter } from 'react-router';
import { Container, Wrapper } from './styles';
import qs from 'query-string';
import PropType from 'prop-types';
import { API_URL } from '@Constants/environments';
import axios from 'axios';
import PageNavigator from '@Components/PageNavigator';
import { parsePageForPost, parsePageInput } from '@Utils/pagination';
import { productNegativeNum } from '@Utils/number';
import ProductFilter from '@Components/Product/ProductFilter';
import { useHistory } from 'react-router-dom';

const PER_PAGE = 15;

const Products = ({ location }) => {
  // 1. url 넣는 방법
  // const parseCondtions = (input) => {
  //   return {
  //     categoryId: input?.categoryId,
  //   }
  // }

  // 2. base64를 사용한 방법
  const parseCondtions = (input) => {
    if (!('conditions' in input)) {
      return undefined;
    }

    // 위에가 최신문법
    // if(typeOf input === 'object' && input.hasOwnProperty('conditions')) {}

    let conditions;

    try {
      const str = window.atob(input.conditions);
      conditions = JSON.parse(str);
    } catch (error) {
      return undefined;
    }

    return conditions;
  };

  console.log(location.search, 'locationSearch');
  const pageInput = useMemo(() => parsePageInput(qs.parse(location.search), PER_PAGE), [location.search]);

  const conditions = useMemo(() => parseCondtions(qs.parse(location.search)), [location.search]);

  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalCount: 0,
  });

  const history = useHistory();

  const get = async () => {
    const CancelToken = axios.CancelToken;

    const source = CancelToken.source();

    getProducts(source.token, pageInput);

    setTimeout(() => {
      if (source) {
        source.cancel();
      }
    }, 5000);
  };

  const getProducts = async (token, pageInput) => {
    try {
      const { data } = await axios(API_URL + '/products', {
        params: {
          page: parsePageForPost(pageInput.page),
          perPage: productNegativeNum(pageInput.perPage),
          conditions: conditions,
          // ...pageInput,
        },
        cancelToken: token,
      });

      setProducts(data.list);
      setPageInfo(data.pageInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    get();
  }, [pageInput, conditions]);

  const encodeBase64 = (object) => {
    const str = JSON.stringify(object);

    if (!str) {
      return undefined;
    }

    const hashed = window.btoa(str);
    return hashed;
  };

  const onChangeFilter = (value) => {
    const hashed = encodeBase64(value);

    let url = '/products?page=1&perPage=15';

    if (hashed) {
      url += `&conditions=${hashed}`;
    }
    history.replace(url);
  };

  return (
    <Container>
      <ProductBanner />
      <Wrapper>
        <ProductFilter conditions={conditions} onChange={onChangeFilter} />
        <div style={{ width: '80%' }}>
          <ProductsList list={products} />
          <PageNavigator
            conditions={encodeBase64(conditions)}
            currentPage={pageInput.page}
            pageInfo={pageInfo}
            perPage={PER_PAGE}
          />
        </div>
      </Wrapper>
    </Container>
  );
};

// 페이지네이션
// cursor (cursor, perPage) 총 데이터 알 수 없다. (데이터 업데이트가 잦거나, 모바일 infinite pagination에서 많이 씀)

// pk를 커서로 두고 커서 기준으로 데이터를 가져온다.
// id => [0, 100]
// 커서 기준으로 정렬한다 => 예제로 id로 정렬
// 맨 처음 커서는 undefined
// perPage = 20 => 데이터 id가 (0 ~ 19)

// 데이터를 가져오면 마지막 데이터를 cursor로 설정 (예제 커서는 id기준이니깐 받은 마지막 오브젝트의 id를 커서로)
// list[list.length - 1] << 마지막 데이터의 id를 커서로

// cursor = 19, perPage = 20 => 서버에서 SELECT 조건으로 id > cursor => id가 (20 ~ 39)인 데이터
// cursor = 39, perPage = 20 => (40 ~ 59)

// offset (page, perPage) 총 데이터 70개 (데이터 업데이트가 별로 없거나, 페이지 별로 나눌 때)

// offset(page * perPage), limit(perPage)
// skip(page * perPage), take(perPage),
// page, perPage

// page = 0, perPage = 20 => 데이터 (0, 19)
// page = 1, perPage = 20 => 데이터 (20, 39) (skip 20)
// page = 2, perPage = 20 => 데이터 (40, 59) (skip 40)
// page = 3, perPage = 20 => 데이터 (60, 70)

// 방금 받은 데이터가 perPage 보다 작다 => 마지막 페이지

// 받은 데이터가 perPage랑 같다 => 다음 페이지 존재
// perPage에 딱 맞는 데이터 값이면 요청은 한 번 더한다. (한 번 더 한다고 서버가 죽는게 아님) => 설계상 어쩔 수 없음

// 페이지네이션 Nav에서 총 존재하는 페이지를 보여주기 위해서 매 요청마다 전체 count를 보내준다.

// 버튼 수는 전체 count / perPage => 80 / 20 = 4
// 이전 [1] [2] [3] [4] [5] [6] [7] [8] [9] 다음 => count 모를 때
// 이전 [1] [2] [3] [4] 다음 => count를 알 때

// 정렬 필수 (정렬 조건은 아무거나 가능)

Products.propTypes = {
  location: PropType.object,
};

export default withRouter(Products);
