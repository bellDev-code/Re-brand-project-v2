import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from './styles';
import { FlexBox } from '@Styles/Common';

const PageNavigator = ({ perPage }) => {
  return (
    <Container>
      <FlexBox center={true}>
        {Array.from({
          length: 10,
        }).map((_, index) => {
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

PageNavigator.prototype = {
  perPage: PropTypes.number,
};

export default PageNavigator;
