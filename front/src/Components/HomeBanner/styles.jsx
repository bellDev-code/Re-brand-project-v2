import styled from '@emotion/styled';

export const Container = styled.section`
  display: flex;
  padding: 130px 0;
  background-position: center;
`;

export const BannerBox = styled.div``;

export const BannerTitle = styled.div`
  font-size: 130px;
  text-transform: uppercase;
  font-weight: 100;
  line-height: 150px;
  & > h1 {
    font-size: 100px;
    margin: 0;
    & > span {
      font-size: 120px;
    }
  }
`;

export const BannerSubTitle = styled.p`
  font-size: 24px;
`;
