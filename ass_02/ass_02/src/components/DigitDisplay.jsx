import React from 'react';

const DigitDisplay = ({ digits }) => {
  if (!digits || digits.length === 0) return null;

  return (
    <div className="digit-breakdown">
      <p className="breakdown-title">Digit Breakdown:</p>
      <div className="digits-grid">
        {digits.map((digit, index) => (
          <div key={index} className="digit-card">
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DigitDisplay;
