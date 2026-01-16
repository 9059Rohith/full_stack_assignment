import React from 'react';

const SumResult = ({ sum, show }) => {
  if (!show) return null;

  return (
    <div className="result-section">
      <p className="label">Sum of Digits:</p>
      <div className="sum-display">{sum}</div>
      <div className="celebration">{sum > 50 ? '🎉' : '✨'}</div>
    </div>
  );
};

export default SumResult;
