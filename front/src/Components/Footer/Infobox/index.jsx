import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div``;

const InfoBox = () => {
  return (
    <Container>
      <h3>INFORMATION</h3>
      <ul>
        <li>Home</li>
        <li>About US</li>
        <li>Privacy Policy</li>
        <li>FAQ</li>
      </ul>
    </Container>
  );
};

export default InfoBox;
