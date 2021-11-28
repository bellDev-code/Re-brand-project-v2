import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from './styles';
import { FlexBox } from '@Styles/Common';

const PageNavigator = ({ currentPage, perPage, pageInfo }) => {
  console.log('pageInfo', pageInfo);
  const pageCount = useMemo(() => {
    let result = Math.floor(pageInfo.totalCount / perPage);

    if (pageInfo.totalCount % perPage !== 0) {
      result += 1;
    }
    return result;
  }, [pageInfo]);

  return (
    <Container>
      <FlexBox center={true}>
        {Array.from({
          length: pageCount,
        }).map((_, index) => {
          if (currentPage === index + 1) {
            return (
              <Button disable key={index} style={{ fontWeight: 700 }}>
                {index + 1}
              </Button>
            );
          }
          return (
            <Button to={`/products?page=${index + 1}&&perPage=${perPage}`} key={index}>
              {index + 1}
            </Button>
          );
        })}
      </FlexBox>
    </Container>
  );
};

PageNavigator.propTypes = {
  currentPage: PropTypes.number,
  perPage: PropTypes.number,
  pageInfo: PropTypes.object,
};

export default PageNavigator;
