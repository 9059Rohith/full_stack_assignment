import React, { useState } from 'react';

const App = () => {
  const [display, setDisplay] = useState('');
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState('Novice Wizard');
  const [feedback, setFeedback] = useState('Welcome, Hero!');

  const updateRank = (newScore) => {
    if (newScore >= 100) setRank('Math Legend');
    else if (newScore >= 50) setRank('Master Calculator');
    else if (newScore >= 20) setRank('Number Knight');
  };

  const handleClick = (val) => {
    if (display.length < 12) {
      setDisplay((prev) => prev + val);
    }
  };

  const calculate = () => {
    try {
      // Basic math evaluation
      const result = eval(display);
      if (result !== undefined) {
        setDisplay(result.toString());
        const newScore = score + 10;
        setScore(newScore);
        updateRank(newScore);
        setFeedback('✨ Excellent! +10 XP ✨');
        setTimeout(() => setFeedback('Keep going!'), 2000);
      }
    } catch (e) {
      setFeedback('⚠️ Magic fizzled! Try again.');
      setDisplay('');
    }
  };

  return (
    <div className="app-wrapper">
      <style>{`
        /* Full Page Reset */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .app-wrapper {
          width: 100vw;
          height: 100vh;
          background: radial-gradient(circle at center, #0d4433 0%, #051a14 100%);
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          overflow: hidden;
          position: relative;
        }

        /* Ambient Glow Background */
        .app-wrapper::before {
          content: "";
          position: absolute;
          width: 40vw;
          height: 40vw;
          background: rgba(52, 211, 153, 0.05);
          filter: blur(100px);
          border-radius: 50%;
          top: 10%;
          left: 10%;
          z-index: 0;
        }

        /* Stats Header */
        .dashboard {
          position: relative;
          z-index: 1;
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
          width: 100%;
          max-width: 440px;
        }

        .stat-card {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 15px;
          border-radius: 24px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .stat-label {
          display: block;
          font-size: 0.7rem;
          color: #34d399;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 5px;
        }

        .stat-value {
          font-size: 1.4rem;
          font-weight: bold;
        }

        /* Calculator Body */
        .calculator-container {
          position: relative;
          z-index: 1;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 50px;
          padding: 40px;
          width: 100%;
          max-width: 440px;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
        }

        .feedback-bar {
          text-align: center;
          height: 20px;
          margin-bottom: 15px;
          font-size: 0.9rem;
          color: #a7f3d0;
          font-weight: 500;
        }

        .screen {
          background: rgba(0, 0, 0, 0.25);
          border-radius: 25px;
          padding: 25px;
          margin-bottom: 30px;
          text-align: right;
          border: 1px solid rgba(255, 255, 255, 0.05);
          min-height: 100px;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
        }

        .display-value {
          font-size: 3.5rem;
          font-weight: 200;
          letter-spacing: -1px;
          white-space: nowrap;
          overflow: hidden;
        }

        /* Buttons Grid */
        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }

        button {
          height: 70px;
          border: none;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.07);
          color: white;
          font-size: 1.4rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        button:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-3px);
        }

        button:active {
          transform: scale(0.92);
        }

        .op-btn { background: rgba(52, 211, 153, 0.15); color: #34d399; }
        .clear-btn { background: rgba(239, 68, 68, 0.15); color: #f87171; }
        
        .equal-btn {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          grid-row: span 2;
          height: auto;
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
        }

        .zero-btn { grid-column: span 2; }

        .footer-tag {
          margin-top: 40px;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: rgba(255, 255, 255, 0.3);
          z-index: 1;
        }
      `}</style>

      {/* Top Dashboard */}
      <div className="dashboard">
        <div className="stat-card">
          <span className="stat-label">Hero Rank</span>
          <strong className="stat-value">{rank}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total XP</span>
          <strong className="stat-value">{score}</strong>
        </div>
      </div>

      {/* Calculator Interface */}
      <div className="calculator-container">
        <div className="feedback-bar">{feedback}</div>
        
        <div className="screen">
          <div className="display-value">{display || '0'}</div>
        </div>
        
        <div className="grid">
          <button onClick={() => setDisplay('')} className="clear-btn">C</button>
          <button onClick={() => handleClick('/')} className="op-btn">÷</button>
          <button onClick={() => handleClick('*')} className="op-btn">×</button>
          <button onClick={() => setDisplay(display.slice(0, -1))} className="clear-btn">⌫</button>
          
          <button onClick={() => handleClick('7')}>7</button>
          <button onClick={() => handleClick('8')}>8</button>
          <button onClick={() => handleClick('9')}>9</button>
          <button onClick={() => handleClick('-')} className="op-btn">-</button>
          
          <button onClick={() => handleClick('4')}>4</button>
          <button onClick={() => handleClick('5')}>5</button>
          <button onClick={() => handleClick('6')}>6</button>
          <button onClick={() => handleClick('+')} className="op-btn">+</button>
          
          <button onClick={() => handleClick('1')}>1</button>
          <button onClick={() => handleClick('2')}>2</button>
          <button onClick={() => handleClick('3')}>3</button>
          <button onClick={calculate} className="equal-btn">=</button>
          
          <button onClick={() => handleClick('0')} className="zero-btn">0</button>
          <button onClick={() => handleClick('.')}>.</button>
        </div>
      </div>

      <div className="footer-tag">Education Portal v1.0</div>
    </div>
  );
};

export default App;