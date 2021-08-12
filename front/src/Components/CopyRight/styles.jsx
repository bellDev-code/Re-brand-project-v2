import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  padding: 15px 0;
  border-top: 1px solid #ededed;
  background: #000;
  justify-content: space-between;
`;

export const LeftWidget = styled.div`
  color: #fff;
  font-weight: 400;
  width: 50%;
  & > span {
    color: #f79837;
    font-weight: 600;
  }
`;

export const RightWidget = styled.div`
  color: #fff;
  width: 50%;
`;
