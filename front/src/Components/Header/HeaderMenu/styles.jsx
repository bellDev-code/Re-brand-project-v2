import styled from '@emotion/styled';

export const MenuContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > svg {
    margin: 0 15px 0 15px;
    font-size: 20px;
  }

  & > a {
    font-weight: 700;
    font-size: 1rem;
    margin-right: 1rem;
  }
`;
