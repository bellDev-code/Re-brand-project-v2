import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const FlexBox = styled.div`
  display: flex;

  ${(props) =>
    props.center &&
    css`
      justify-content: center;
      align-items: center;
    `}
`;
