import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const backOption = [
  { value: '토트 백', label: '토트 백', className: 'tote-back' },
  { value: '숄더 백', label: '숄더 백', className: 'shoulder-back' },
  { value: '클러치 백', label: '클러치 백', className: 'clutch-back' },
];

const watchOption = [
  { value: '토트 백', label: '토트 백', className: 'tote-back' },
  { value: '숄더 백', label: '숄더 백', className: 'shoulder-back' },
  { value: '클러치 백', label: '클러치 백', className: 'clutch-back' },
];

const DropDown = () => {
  return (
    <div>
      <Dropdown options={backOption} placeholder="가방" />
      <Dropdown options={watchOption} placeholder="시계" />
    </div>
  );
};

export default DropDown;
