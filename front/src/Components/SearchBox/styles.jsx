import styled from '@emotion/styled';

export const Container = styled.div`
  position: absolute;
  background-color: #ffffff;
  min-width: 250px;
  top: 100%;
  height: 500px;
  right: 0px;
  bottom: 0;

  button {
    background-color: transparent;
    border: none;
  }
`;

export const Wrapper = styled.div`
  padding: 8px;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 0;
  cursor: pointer;
`;
