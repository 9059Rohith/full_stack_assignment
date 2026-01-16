import React from 'react';
import { RotateCcw, Home } from 'lucide-react';

const GameOver = ({ score, level, onRestart, onMenu }) => {
  return (
    <div className="gameover-screen">
      <h1 className="gameover-title">Mission Complete!</h1>
      <div className="final-stats">
        <div className="stat-item">
          <span className="stat-label">Final Score</span>
          <span className="stat-value">{score}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Level Reached</span>
          <span className="stat-value">{level}</span>
        </div>
      </div>
      
      <div className="gameover-buttons">
        <button className="retry-button" onClick={onRestart}>
          <RotateCcw size={20} />
          <span>Try Again</span>
        </button>
        <button className="menu-button" onClick={onMenu}>
          <Home size={20} />
          <span>Menu</span>
        </button>
      </div>
    </div>
  );
};

export default GameOver;
