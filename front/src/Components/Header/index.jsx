import React from 'react';
import { Container, MenuContainer, MenuButton, LogoContainer } from './styles.jsx';

const Header = () => {
  return (
    <Container>
      <LogoContainer>
        <p style={{ fontSize: 25, fontWeight: 700 }}>Rebrand</p>
      </LogoContainer>
      <MenuContainer>
        <MenuButton>홈</MenuButton>
        <MenuButton>상품검색</MenuButton>
        <MenuButton>마이메뉴</MenuButton>
        <MenuButton>고객센터</MenuButton>
        <MenuButton>ABOUT US</MenuButton>
      </MenuContainer>
      <div style={{ width: '20%' }}></div>
    </Container>
  );
};

export default Header;