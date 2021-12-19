import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillBucketFill, BsFillHeartFill, BsSearch, BsJustify } from 'react-icons/bs';
import { MenuContainer } from './styles';
import PropTypes from 'prop-types';

const HeaderMenu = ({ user }) => {
  return (
    <MenuContainer>
      {!user && <Link to="/login">login</Link>}
      <Link to="/">
        <BsFillHeartFill />
      </Link>
      <Link to="/">
        <BsFillBucketFill />
      </Link>
      <Link to="/">
        <BsSearch />
      </Link>
      <Link to="/">
        <BsJustify />
      </Link>
    </MenuContainer>
  );
};

HeaderMenu.propTypes = {
  user: PropTypes.any,
};

export default HeaderMenu;
