import styled from '@emotion/styled';
import { BsTypeBold } from 'react-icons/bs';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const ItemBox = styled.div`
  box-shadow: 0px 0px 7px 5px rgb(0 0 0 / 25%);
  padding: 30px 40px;
  background: #fff;
  width: 50%;
  & > h3 {
    margin: 0;
    font-size: 24px;
    font-weight: 500;
    text-align: center;
  }
`;

export const ItemTitle = styled.div`
  font-size: 2rem;
  font-weight: 400;
`;

export const ItemBrand = styled.div``;

export const Wrapper = styled.div`
  display: flex;
`;

export const PriceWrapper = styled.div`
  display: flex;
`;

export const ImageWrapper = styled.div`
  flex: 1;
`;

export const MainImage = styled.img``;

export const ProductInfoWrapper = styled.div`
  flex: 1;
`;

export const SalePercent = styled.div``;

export const ItemPrice = styled.div`
  display: flex;
  font-size: 2.5rem;
  font-weight: 600;
`;
