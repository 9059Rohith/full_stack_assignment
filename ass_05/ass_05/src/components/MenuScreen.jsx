import React from 'react';
import { Play, Info } from 'lucide-react';

const MenuScreen = ({ onStart }) => {
  return (
    <div className="menu-screen">
      <h1 className="game-title">🚀 Space Math Adventure</h1>
      <p className="game-subtitle">Defend your rocket by solving math problems!</p>
      
      <button className="start-button" onClick={onStart}>
        <Play size={24} />
        <span>Start Mission</span>
      </button>
      
      <div className="game-info">
        <Info size={16} />
        <span>Solve problems quickly to earn points!</span>
      </div>
    </div>
  );
};

export default MenuScreen;
