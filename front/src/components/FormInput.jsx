// FormInput.js
import React, { useState } from "react";

const FormInput = ({ placeholder, name, value, type, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange({ target: { name, value: newValue } });
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={inputValue}
      onChange={handleChange}
      className= "border-2 border-gray-300 p-2 rounded-xl"
    />
  );
};

export default FormInput;
