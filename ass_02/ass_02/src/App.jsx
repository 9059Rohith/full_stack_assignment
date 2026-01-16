import React, { useState } from 'react';
import NumberInput from './components/NumberInput';
import SumResult from './components/SumResult';
import DigitDisplay from './components/DigitDisplay';

export default function App() {
  const [num, setNum] = useState("");
  const [sum, setSum] = useState(0);
  const [digits, setDigits] = useState([]);

  const calculateSum = (value) => {
    const cleanDigits = value.replace(/\D/g, '');
    const digitArray = cleanDigits.split('');
    const total = digitArray.reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    
    setSum(total);
    setNum(value);
    setDigits(digitArray);
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

        .digit-breakdown {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.3);
        }

        .breakdown-title {
          font-size: 0.9rem;
          opacity: 0.9;
          margin-bottom: 1rem;
        }

        .digits-grid {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .digit-card {
          background: rgba(255, 255, 255, 0.2);
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .celebration {
          margin-top: 1rem;
          font-size: 2rem;
        }
      `}</style>

      <div className="glass-card">
        <h1>✨ Digit Sum Calculator</h1>
        
        <NumberInput value={num} onChange={calculateSum} />

        <SumResult sum={sum} show={!!num} />
        
        {!num && <p className="instruction">Type a number to see the magic!</p>}
        
        <DigitDisplay digits={digits} />
      </div>
    </div>
  );
}
