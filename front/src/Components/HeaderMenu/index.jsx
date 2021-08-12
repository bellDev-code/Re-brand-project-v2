import React from 'react';
import { BsFillBucketFill, BsFillHeartFill, BsSearch, BsJustify } from 'react-icons/bs';
import { MenuContainer } from './styles';

const HeaderMenu = () => {
  return (
    <MenuContainer>
      <BsFillHeartFill />
      <BsFillBucketFill />
      <BsSearch />
      <BsJustify />
    </MenuContainer>
  );
};

export default HeaderMenu;
