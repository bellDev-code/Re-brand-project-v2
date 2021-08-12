import React from 'react';
import { Container, LeftWidget, RightWidget } from './styles';

const copyRight = () => {
  return (
    <Container>
      <LeftWidget>
        © CopyRight 2021 <span>Rebrand</span>
      </LeftWidget>
      <RightWidget>이미지</RightWidget>
    </Container>
  );
};

export default copyRight;
