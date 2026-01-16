import React from 'react';

const ButtonGrid = ({ updateCalc, calculate, clear, deleteLast }) => {
  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+']
  ];

  const handleClick = (value) => {
    if (value === '=') {
      calculate();
    } else {
      updateCalc(value);
    }
  };

  return (
    <div className="button-grid">
      <button className="btn-clear" onClick={clear}>C</button>
      <button className="btn-delete" onClick={deleteLast}>DEL</button>
      
      {buttons.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((btn) => (
            <button
              key={btn}
              className={`btn ${btn === '=' ? 'btn-equals' : ''} ${['+', '-', '*', '/'].includes(btn) ? 'btn-operator' : ''}`}
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ButtonGrid;
