import React from 'react';
import './CustomInput.scss';

interface CustomInputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange
}) => {
  return (
    <input
      className="custom-input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default CustomInput;
