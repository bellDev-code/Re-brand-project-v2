import { useState } from 'react';

const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState();

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    value,
    setValue,
    onChange,
    error,
    setError,
  };
};

export default useInput;
