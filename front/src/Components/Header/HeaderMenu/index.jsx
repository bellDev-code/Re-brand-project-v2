import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillBucketFill, BsFillHeartFill, BsSearch, BsJustify } from 'react-icons/bs';
import { MenuContainer } from './styles';
import PropTypes from 'prop-types';

const HeaderMenu = ({ user }) => {
  return (
    <MenuContainer>
      {!user && <Link to="/login">login</Link>}
      <BsFillHeartFill />
      <BsFillBucketFill />
      <BsSearch />
      <BsJustify />
    </MenuContainer>
  );
};

HeaderMenu.propTypes = {
  user: PropTypes.any,
};

export default HeaderMenu;
