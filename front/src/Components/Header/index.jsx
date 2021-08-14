import React from 'react';
import { Container, MenuContainer, MenuButton, LogoContainer } from './styles.jsx';
import HeaderMenu from '@Components/HeaderMenu/index.jsx';
// import LogoImage from '@Assets/Logo/Re-logo.png';

const Header = () => {
  return (
    <Container>
      <LogoContainer>
        {/* <img src={LogoImage} /> */}
        Re-Brand
      </LogoContainer>
      <MenuContainer>
        <MenuButton>홈</MenuButton>
        <MenuButton>상품</MenuButton>
        <MenuButton>마이메뉴</MenuButton>
        <MenuButton>고객센터</MenuButton>
        <MenuButton>ABOUT US</MenuButton>
      </MenuContainer>
      <HeaderMenu></HeaderMenu>
    </Container>
  );
};

export default Header;
