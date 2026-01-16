import React, { useState } from 'react';

export default function App() {
  const [num, setNum] = useState("");
  const [sum, setSum] = useState(0);

  const calculateSum = (value) => {
    const digits = value.replace(/\D/g, '');
    const total = digits
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    
    setSum(total);
    setNum(value);
  };

  return (
    <div className="full-page-wrapper">
      <style>{`
        /* Reset default margins */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .full-page-wrapper {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          /* Vibrant Green Gradient Background */
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
          font-family: 'Inter', -apple-system, sans-serif;
        }

        .glass-card {
          /* Transparent White */
          background: rgba(255, 255, 255, 0.2);
          /* Blur effect for Glassmorphism */
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          
          padding: 3rem;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
          
          width: 90%;
          max-width: 450px;
          text-align: center;
          color: white;
        }

        h1 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .input-container {
          margin-bottom: 2rem;
        }

        input {
          width: 100%;
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 12px;
          padding: 15px;
          font-size: 1.5rem;
          color: white;
          outline: none;
          transition: all 0.3s ease;
          text-align: center;
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        input:focus {
          background: rgba(255, 255, 255, 0.25);
          border-color: #ffffff;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
        }

        /* Remove arrows from number input */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .result-section {
          margin-top: 1rem;
        }

        .label {
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.8rem;
          opacity: 0.9;
          margin-bottom: 10px;
          display: block;
        }

        .sum-result {
          font-size: 5rem;
          font-weight: 800;
          margin: 0;
          line-height: 1;
          text-shadow: 2px 4px 10px rgba(0,0,0,0.2);
        }

        .instruction {
          font-size: 1.1rem;
          opacity: 0.8;
        }
      `}</style>

      <div className="glass-card">
        <h1>Digit Sum</h1>
        
        <div className="input-container">
          <span className="label">Enter a Number</span>
          <input
            type="number"
            placeholder="0"
            value={num}
            onChange={(e) => calculateSum(e.target.value)}
            autoFocus
          />
        </div>

        <div className="result-section">
          {num ? (
            <>
              <span className="label">Total Sum</span>
              <p className="sum-result">{sum}</p>
            </>
          ) : (
            <p className="instruction">Type to start calculating</p>
          )}
        </div>
      </div>
    </div>
  );
}
