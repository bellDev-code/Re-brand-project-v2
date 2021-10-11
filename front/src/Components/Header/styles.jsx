import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: #fef5ef;
`;

export const MenuContainer = styled.ul`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

export const MenuLink = styled(Link)`
  border: 0;
  background-color: transparent;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  color: #000000;
  display: flex;
  align-items: center;

  :visited {
    color: #000000;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  width: 20%;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: 600;
  & > img {
    width: 100%;
  }
`;
