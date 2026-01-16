import React from 'react';

const Display = ({ history, current }) => {
  return (
    <div className="display">
      <div className="history">{history}</div>
      <div className="current">{current}</div>
    </div>
  );
};

export default Display;
