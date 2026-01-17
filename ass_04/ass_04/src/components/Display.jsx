import React from 'react';

const Display = ({ history, current, mode }) => {
  return (
    <div className="display">
      <div className="mode-indicator">{mode === 'calc' ? 'Calculator Mode' : 'String Mode'}</div>
      <div className="history">{history}</div>
      <div className="current">{current}</div>
    </div>
  );
};

export default Display;
