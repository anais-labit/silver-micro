import React, { useState } from "react";

const SelectInput = ({ options, name, value, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onChange({ target: { name, value: newValue } });
  };

  return (
    <select
      name={name}
      value={selectedValue}
      onChange={handleChange}
      className="border-2 border-gray-300 p-2 rounded-xl"
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
