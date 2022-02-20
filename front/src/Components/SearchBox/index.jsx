import React, { useCallback, useState } from 'react';
import { Container, Wrapper, CloseButton } from './styles';
import { IoClose } from 'react-icons/io5';

const SearchBox = ({ setIsVisbleModal }) => {
  const onClickClose = useCallback(() => {
    setIsVisbleModal(false);
  });

  return (
    <Container>
      <Wrapper>
        <CloseButton onClick={onClickClose}>
          <IoClose />
        </CloseButton>
      </Wrapper>
    </Container>
  );
};

export default SearchBox;
