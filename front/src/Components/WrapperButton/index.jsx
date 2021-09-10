import React, { memo } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const LoginBtn = styled.button`
  cursor: pointer;
  background-color: #000;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 0;
  padding: 16px 35px;
`;

const PageButton = ({ name, type = 'text' }) => {
  return (
    <ButtonWrapper>
      <LoginBtn type={type}>{name}</LoginBtn>
    </ButtonWrapper>
  );
};

PageButton.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
};

export default memo(PageButton);
