import React from 'react';
import { Rocket, Target, Trophy, Heart } from 'lucide-react';

const GameHeader = ({ score, level, lives, combo }) => {
  return (
    <div className="game-header">
      <div className="stat">
        <Trophy className="icon" size={20} />
        <span>{score}</span>
      </div>
      <div className="stat">
        <Target className="icon" size={20} />
        <span>Level {level}</span>
      </div>
      <div className="stat">
        <Heart className="icon" size={20} color={lives > 1 ? '#ef4444' : '#666'} />
        <span>×{lives}</span>
      </div>
      {combo > 0 && (
        <div className="combo-badge">
          🔥 {combo}x Combo!
        </div>
      )}
    </div>
  );
};

export default GameHeader;
