import Selector from '@Components/Selector';
import React, { useState } from 'react';

const useSelector = (initialValue, list) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (v) => {
    setValue(v);
  };

  const makeSelectElement = () => {
    return list?.map((element) => {
      return {
        name: element.name,
        value: element.id,
      };
    });
  };

  const render = () => {
    return <Selector initialValue={value} list={makeSelectElement()} onChange={onChange} />;
  };

  return {
    value: value,
    onChange: onChange,
    render: render,
  };
};

export default useSelector;
