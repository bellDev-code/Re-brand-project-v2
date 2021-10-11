import React, { useCallback, useContext } from 'react';
import { Container, MenuContainer, MenuLink, LogoContainer } from './styles.jsx';
import HeaderMenu from '@Components/Header/HeaderMenu/index.jsx';
import LogoImage from '@Assets/Layouts/re-logo.png';
import PropTypes from 'prop-types';
import { AuthContext } from '@Hooks/Contexts/AuthContext.jsx';
import { useHistory } from 'react-router';

const Header = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const MenuList = [
    {
      name: '홈',
      url: '/',
    },
    {
      name: '상품',
      url: '/products',
    },
    {
      name: '마이메뉴',
      url: '/',
    },
    {
      name: '고객센터',
      url: '/',
    },
    {
      name: 'ABOUT US',
      url: '/',
    },
  ];

  const goLink = useCallback(
    (item) => {
      history.push(`${item.url}`);
    },
    [history],
  );

  console.log(goLink);

  return (
    <Container>
      <LogoContainer>
        <img src={LogoImage} />
      </LogoContainer>
      <MenuContainer>
        {MenuList.map((item, index) => {
          return (
            <MenuLink to={item.url} key={index}>
              {item.name}
            </MenuLink>
          );
        })}
      </MenuContainer>
      <HeaderMenu user={user}></HeaderMenu>
    </Container>
  );
};

// typescript에서
// interface Props {
//   user: object
// }

// javascript에서
Header.propTypes = {
  user: PropTypes.any,
};
export default Header;
