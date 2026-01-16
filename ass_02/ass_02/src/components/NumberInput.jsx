import React from 'react';

const NumberInput = ({ value, onChange }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter a number..."
        className="number-input"
      />
    </div>
  );
};

export default NumberInput;
