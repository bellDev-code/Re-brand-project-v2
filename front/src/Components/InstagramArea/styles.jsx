import styled from '@emotion/styled';

export const Container = styled.section``;

export const InstaBox = styled.div``;

export const TextWrapper = styled.div`
  padding-top: 90px;
  padding-bottom: 40px;
  text-align: center;
  & > h2 {
    margin: 0;
    font-size: 36px;
  }
`;

export const SvgWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
  color: #777c87;
  & > p {
    display: flex;
    font-size: 16px;
    margin: 0;
    align-items: center;
    & > svg {
      font-size: 20px;
    }
  }
`;
