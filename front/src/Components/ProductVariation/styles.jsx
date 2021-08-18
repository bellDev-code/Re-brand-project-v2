import styled from '@emotion/styled';

export const Container = styled.section`
  padding-top: 100px;
`;

export const VariationBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ProductBox = styled.div`
  flex: 1;
  position: relative;
  padding: 0 15px 0 15px;
`;

export const Item_Wrapper = styled.div`
  position: relative;
`;

export const Item_one = styled.div`
  position: relative;
  & > img {
    width: 100%;
    margin-bottom: 30px;
  }
`;

export const OneItem = styled.div`
  position: absolute;
  bottom: 30%;
  left: 60%;
  & > h4 {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
    color: #f79837;
  }

  & > h2 {
    margin: 0;
    font-size: 36px;
  }

  & > h3 {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
  }
`;

export const TwoItem = styled.div`
  position: absolute;
  bottom: 28%;
  right: 50%;
  & > h4 {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
    color: #f79837;
  }

  & > h2 {
    margin: 0;
    font-size: 36px;
  }

  & > h3 {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
  }
`;

export const Item_two = styled.div`
  & > img {
    width: 100%;
  }
`;

export const MiddleWrapper = styled.div`
  position: absolute;
  bottom: 18%;
  left: 10%;

  & > h2 {
    color: #f79837;
    font-size: 36px;
    margin: 0;
  }
`;

export const ShopBtn = styled.button`
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-radius: 1.5px;
  box-shadow: 1.5px 1.5px 1.5px lightgrey;
  background-color: #000;
  color: #fff;
  padding: 10px 16px;
  margin-top: 20px;
`;
