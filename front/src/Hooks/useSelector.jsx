import Selector from '@Components/Selector';
import React, { useState } from 'react';

const useSelector = (list) => {
  const [value, setValue] = useState();

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
    return <Selector list={makeSelectElement()} onChange={onChange} />;
  };

  return {
    value: value,
    onChange: onChange,
    render: render,
  };
};

export default useSelector;
