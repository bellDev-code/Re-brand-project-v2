import styled from '@emotion/styled';
import BannerImg from '@Assets/Layouts/Banner/home-banner.jpg';

export const Container = styled.section`
  display: flex;
  padding: 130px 0;
  background-position: center;
  background-image: url(${BannerImg});
`;

export const BannerBox = styled.div`
  padding-left: 15px;
`;

export const BannerTitle = styled.div`
  font-size: 130px;
  text-transform: uppercase;
  font-weight: 100;
  line-height: 150px;
  & > h1 {
    font-size: 100px;
    margin: 0;
    font-weight: 100;
    & > span {
      font-size: 120px;
      color: #fff;
      font-weight: 600;
    }
  }
`;

export const BannerSubTitle = styled.p`
  font-size: 24px;
  color: #fff;
`;
