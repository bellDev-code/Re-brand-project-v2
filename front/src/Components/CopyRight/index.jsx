import React from 'react';
import { Container, LeftWidget, RightWidget } from './styles';
import Payment from '@Assets/Layouts/copyright/payment.png';

const copyRight = () => {
  return (
    <Container>
      <LeftWidget>
        © CopyRight 2021 <span>Rebrand</span>
      </LeftWidget>
      <RightWidget>
        <img src={Payment} />
      </RightWidget>
    </Container>
  );
};

export default copyRight;
