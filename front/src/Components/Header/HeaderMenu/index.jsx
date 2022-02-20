import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillBucketFill, BsFillHeartFill, BsSearch, BsJustify } from 'react-icons/bs';
import { MenuContainer } from './styles';
import PropTypes from 'prop-types';
import SearchBox from '@Components/SearchBox';

const HeaderMenu = ({ user }) => {
  const [isVisibleModal, setIsVisbleModal] = useState(false);

  const onClick = () => {
    setIsVisbleModal(true);
  };

  return (
    <MenuContainer>
      {!user && <Link to="/login">login</Link>}
      <Link to="/">
        <BsFillHeartFill />
      </Link>
      <Link to="/">
        <BsFillBucketFill />
      </Link>
      <button onClick={onClick}>
        <BsSearch />
      </button>
      {isVisibleModal && <SearchBox setIsVisbleModal={setIsVisbleModal} />}
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
