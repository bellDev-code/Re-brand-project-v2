import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select, Option } from './styles';

const Selector = ({ list, onChange: onChangeProp }) => {
  const [selected, setSelected] = useState('');

  const onChange = useCallback((event) => {
    setSelected(event.target.value);
  }, []);

  useEffect(() => {
    // depengency array에 selected를 넣어줌으로써 selected 변경 될때마다 실행
    // 부모의 onChange 함수
    if (onChangeProp) {
      onChangeProp(selected);
    }
  }, [selected]);

  return (
    <div>
      <Select value={selected} onChange={onChange}>
        <Option value="">선택</Option>
        {list?.map((item, index) => {
          return (
            <Option key={index} value={item.value}>
              {item.name}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

Selector.propTypes = {
  list: PropTypes.array,
  onChange: PropTypes.func,
};

export default Selector;
