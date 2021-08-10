import styled from '@emotion/styled';

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

export const MenuButton = styled.button`
  border: 0;
  background-color: transparent;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

export const LogoContainer = styled.div`
  display: flex;
  width: 20%;
  justify-content: center;
  max-width: 500px;
  & > img {
    width: 100%;
  }
`;
