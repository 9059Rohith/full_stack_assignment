import React, { useState } from 'react';

const App = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("0");

  const ops = ['/', '*', '+', '-', '.'];

  const updateCalc = (value) => {
    if (
      (ops.includes(value) && input === '') ||
      (ops.includes(value) && ops.includes(input.slice(-1)))
    ) return;

    const newInput = input + value;
    setInput(newInput);

    if (!ops.includes(value)) {
      try {
        setResult(eval(newInput).toString());
      } catch (e) { }
    }
  };

  const calculate = () => {
    try {
      const finalResult = eval(input).toString();
      setInput(finalResult);
      setResult(finalResult);
    } catch (err) {
      setResult("Error");
    }
  };

  const clear = () => {
    setInput("");
    setResult("0");
  };

  const deleteLast = () => {
    const val = input.slice(0, -1);
    setInput(val);
    if(val === "") setResult("0");
  };

  return (
    <div className="wrapper">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, sans-serif;
        }

        .wrapper {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, #0a2f26 0%, #010a08 100%);
          overflow: hidden;
        }

        /* Glass Card */
        .glass-calculator {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          width: 360px;
          padding: 32px;
          border-radius: 40px;
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
        }

        /* Display */
        .display {
          text-align: right;
          padding: 20px 10px;
          margin-bottom: 20px;
        }

        .history {
          color: rgba(52, 211, 153, 0.4);
          font-size: 1rem;
          min-height: 1.2rem;
          margin-bottom: 10px;
          letter-spacing: 1px;
        }

        .current {
          color: #ffffff;
          font-size: 3.5rem;
          font-weight: 200;
          letter-spacing: -1px;
        }

        /* Grid Structure */
        .buttons-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        button {
          height: 68px;
          border-radius: 20px;
          border: none;
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          font-size: 1.25rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        button:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
        }

        button:active {
          transform: scale(0.95);
        }

        /* Special Styling */
        .span-2 {
          grid-column: span 2;
        }

        .btn-ac {
          background: rgba(255, 95, 82, 0.1);
          color: #ff5f52;
          font-weight: 700;
        }

        .btn-op {
          background: rgba(52, 211, 153, 0.1);
          color: #34d399;
          font-size: 1.5rem;
        }

        .btn-equals {
          background: #10b981;
          color: #052e21;
          font-weight: 800;
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }

        .btn-equals:hover {
          background: #34d399;
        }
      `}</style>

      <div className="glass-calculator">
        <div className="display">
          <div className="history">{input || "0"}</div>
          <div className="current">{result}</div>
        </div>

        <div className="buttons-grid">
          {/* Row 1 */}
          <button className="span-2 btn-ac" onClick={clear}>AC</button>
          <button className="btn-op" onClick={deleteLast}>⌫</button>
          <button className="btn-op" onClick={() => updateCalc('/')}>÷</button>

          {/* Row 2 */}
          <button onClick={() => updateCalc('7')}>7</button>
          <button onClick={() => updateCalc('8')}>8</button>
          <button onClick={() => updateCalc('9')}>9</button>
          <button className="btn-op" onClick={() => updateCalc('*')}>×</button>

          {/* Row 3 */}
          <button onClick={() => updateCalc('4')}>4</button>
          <button onClick={() => updateCalc('5')}>5</button>
          <button onClick={() => updateCalc('6')}>6</button>
          <button className="btn-op" onClick={() => updateCalc('-')}>-</button>

          {/* Row 4 */}
          <button onClick={() => updateCalc('1')}>1</button>
          <button onClick={() => updateCalc('2')}>2</button>
          <button onClick={() => updateCalc('3')}>3</button>
          <button className="btn-op" onClick={() => updateCalc('+')}>+</button>

          {/* Row 5 */}
          <button className="span-2" onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>
          <button className="btn-equals" onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
};

export default App;