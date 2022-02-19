import styled from '@emotion/styled';

export const Container = styled.div`
  width: 32%;
  border: 1px solid #b2b2b2;
`;

export const ProductImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: 450px;
  object-fit: cover;
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`

export const ItemTitle = styled.div`
  font-size: 1.2rem;
`

export const ItemPrice = styled.div`
  padding-top: 10px;
  font-weight: bold;
`

export const BrandName = styled.div`
  padding-top: 5px;
`
