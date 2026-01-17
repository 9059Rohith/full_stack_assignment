import React from 'react';

const ButtonGrid = ({ 
  mode,
  updateCalc, 
  calculate, 
  clear, 
  deleteLast,
  updateString,
  stringToUpperCase,
  stringToLowerCase,
  stringReverse,
  stringLength,
  stringTrim,
  stringCapitalize,
  stringRemoveSpaces,
  stringWordCount,
  stringTitleCase,
  stringReplaceVowels,
  stringAlternateCase
}) => {
  const calcButtons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+']
  ];

  const handleCalcClick = (value) => {
    if (value === '=') {
      calculate();
    } else {
      updateCalc(value);
    }
  };

  if (mode === 'calc') {
    return (
      <div className="button-grid">
        <button className="btn-clear" onClick={clear}>C</button>
        <button className="btn-delete" onClick={deleteLast}>DEL</button>
        
        {calcButtons.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((btn) => (
              <button
                key={btn}
                className={`btn ${btn === '=' ? 'btn-equals' : ''} ${['+', '-', '*', '/'].includes(btn) ? 'btn-operator' : ''}`}
                onClick={() => handleCalcClick(btn)}
              >
                {btn}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    );
  }

  // String manipulation mode
  return (
    <div className="string-grid">
      <button className="btn-clear" onClick={clear}>Clear</button>
      <button className="btn-delete" onClick={deleteLast}>DEL</button>
      
      <div className="string-input-area">
        <input 
          type="text" 
          className="string-input"
          placeholder="Type your text here..."
          value=""
          onChange={(e) => {
            const val = e.target.value;
            updateString(val.charAt(val.length - 1));
          }}
        />
      </div>

      <div className="string-functions">
        <button className="btn btn-string" onClick={stringToUpperCase}>
          UPPER
        </button>
        <button className="btn btn-string" onClick={stringToLowerCase}>
          lower
        </button>
        <button className="btn btn-string" onClick={stringReverse}>
          Reverse
        </button>
        <button className="btn btn-string" onClick={stringLength}>
          Length
        </button>
        <button className="btn btn-string" onClick={stringTrim}>
          Trim
        </button>
        <button className="btn btn-string" onClick={stringCapitalize}>
          Capital
        </button>
        <button className="btn btn-string" onClick={stringRemoveSpaces}>
          No Space
        </button>
        <button className="btn btn-string" onClick={stringWordCount}>
          Count
        </button>
        <button className="btn btn-string" onClick={stringTitleCase}>
          Title
        </button>
        <button className="btn btn-string" onClick={stringReplaceVowels}>
          *Vowels
        </button>
        <button className="btn btn-string" onClick={stringAlternateCase}>
          aLtErNaTe
        </button>
        <button className="btn btn-string" onClick={() => updateString(' ')}>
          Space
        </button>
      </div>
    </div>
  );
};

export default ButtonGrid;
