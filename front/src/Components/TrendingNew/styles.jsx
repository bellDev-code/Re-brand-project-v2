import styled from '@emotion/styled';
import TrendImg from '@Assets/Layouts/Banner/trendingbanner.jpg';

export const Container = styled.section`
  padding: 115px 0;
  background-image: url(${TrendImg});
`;

export const TrendingBox = styled.div`
  display: flex;
`;

export const TextWrapper = styled.div`
  text-align: center;
  margin: auto;

  & > h5 {
    color: #f79837;
    font-size: 18px;
    font-weight: 400;
    margin: 0;
  }

  & > h2 {
    font-size: 36px;
    font-weight: 500;
    line-height: 40px;
    margin: 0;
    padding: 10px 0;
    color: #fff;
  }

  & > p {
    padding-bottom: 30px;
    margin: 0;
    color: #fff;
  }
`;

export const TrendingBtn = styled.button`
  padding: 16px 35px;
  letter-spacing: 2px;
  background-color: #fff;
  font-size: 12px;
  font-weight: 600;
  border: none;
  border-radius: 1.5px;
  box-shadow: 1.5px 1.5px 1.5px lightgrey;
  color: #000;
  cursor: pointer;
  :hover {
    box-shadow: 200px 0 0 0 rgba(0, 0, 0, 0.25) inset, -200px 0 0 0 rgba(0, 0, 0, 0.25) inset;
    color: #fff;
  }
`;
