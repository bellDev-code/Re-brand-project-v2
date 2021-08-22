import React, { memo } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import useInput from '@Hooks/useInput';

export const InputWrapper = styled.div`
  margin-bottom: 30px;
  & > input {
    width: 100%;
    min-height: 45px;
    background: #fff;
    border-color: #ddd;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    padding: 0.375rem 0.75rem;
  }
`;

const LabelInput = ({ name, type = 'text', initialValue }) => {
  const input = useInput(initialValue);

  return (
    <InputWrapper>
      <label>{name}</label>
      <input type={type} value={input.value} onChange={input.onChange} />
    </InputWrapper>
  );
};

LabelInput.propTypes = {
  initialValue: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};

export default memo(LabelInput);
