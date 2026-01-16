import React, { useState, useEffect, useRef } from 'react';
import { Rocket } from 'lucide-react';
import MenuScreen from './components/MenuScreen';
import GameHeader from './components/GameHeader';
import ProblemDisplay from './components/ProblemDisplay';
import GameOver from './components/GameOver';

const App = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, gameOver
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [asteroids, setAsteroids] = useState([]);
  const [rocketY, setRocketY] = useState(50);
  const [combo, setCombo] = useState(0);
  const [particles, setParticles] = useState([]);
  const gameLoopRef = useRef(null);
  const inputRef = useRef(null);

  // Generate math problem based on level (addition only)
  const generateProblem = () => {
    const maxNum = Math.min(10 + level * 5, 50);
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;
    
    const answer = num1 + num2;
    const question = `${num1} + ${num2}`;
    
    return { question, answer };
  };

  // Start game
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLevel(1);
    setLives(3);
    setCombo(0);
    setAsteroids([]);
    setRocketY(50);
    setCurrentProblem(generateProblem());
    setUserAnswer('');
  };

  // Create explosion particles
  const createExplosion = (x, y, color) => {
    const newParticles = [];
    for (let i = 0; i < 12; i++) {
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        color,
        life: 1
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  // Handle answer submission
  const submitAnswer = () => {
    if (!currentProblem || userAnswer === '') return;

    const isCorrect = parseInt(userAnswer) === currentProblem.answer;
    
    if (isCorrect) {
      // Correct answer - destroy asteroid
      const newCombo = combo + 1;
      const points = 100 * level + (newCombo * 50);
      setScore(score + points);
      setCombo(newCombo);
      
      // Remove oldest asteroid and create explosion
      if (asteroids.length > 0) {
        createExplosion(95, asteroids[0].y, '#34d399');
        setAsteroids(prev => prev.slice(1));
      }
      
      // Level up every 5 correct answers
      if ((score + points) / 500 > level - 1) {
        setLevel(level + 1);
      }
    } else {
      // Wrong answer - lose life
      setLives(lives - 1);
      setCombo(0);
      createExplosion(5, rocketY, '#ef4444');
      
      if (lives - 1 <= 0) {
        setGameState('gameOver');
        if (gameLoopRef.current) {
          cancelAnimationFrame(gameLoopRef.current);
        }
      }
    }
    
    setCurrentProblem(generateProblem());
    setUserAnswer('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    let lastTime = Date.now();
    let asteroidTimer = 0;

    const gameLoop = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Spawn asteroids
      asteroidTimer += deltaTime;
      const spawnRate = Math.max(1.5 - level * 0.1, 0.5);
      
      if (asteroidTimer > spawnRate) {
        asteroidTimer = 0;
        setAsteroids(prev => {
          if (prev.length < 8) {
            return [...prev, {
              id: Date.now(),
              y: Math.random() * 80 + 10,
              x: 100,
              speed: 15 + level * 2
            }];
          }
          return prev;
        });
      }

      // Move asteroids
      setAsteroids(prev => {
        const updated = prev.map(ast => ({
          ...ast,
          x: ast.x - ast.speed * deltaTime
        })).filter(ast => {
          if (ast.x < -5) {
            // Asteroid reached the rocket
            setLives(l => {
              const newLives = l - 1;
              if (newLives <= 0) {
                setGameState('gameOver');
              }
              return newLives;
            });
            setCombo(0);
            createExplosion(5, rocketY, '#ef4444');
            return false;
          }
          return true;
        });
        return updated;
      });

      // Update particles
      setParticles(prev => prev.map(p => ({
        ...p,
        x: p.x + p.vx * deltaTime * 10,
        y: p.y + p.vy * deltaTime * 10,
        life: p.life - deltaTime * 2
      })).filter(p => p.life > 0));

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, level, lives, rocketY]);

  // Focus input when problem changes
  useEffect(() => {
    if (gameState === 'playing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentProblem, gameState]);

  return (
    <div className="game-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .game-container {
          width: 100vw;
          height: 100vh;
          background: linear-gradient(180deg, #0a0e27 0%, #1a1635 50%, #2d1b4e 100%);
          font-family: 'Segoe UI', system-ui, sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Animated stars background */
        .game-container::before {
          content: "";
          position: absolute;
          width: 200%;
          height: 200%;
          background-image: 
            radial-gradient(2px 2px at 20% 30%, white, transparent),
            radial-gradient(2px 2px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(2px 2px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 90%, white, transparent);
          background-size: 200px 200px, 300px 300px, 150px 150px, 250px 250px, 180px 180px, 220px 220px;
          animation: stars 120s linear infinite;
          opacity: 0.6;
        }

        @keyframes stars {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* Menu Screen */
        .menu-screen {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          gap: 30px;
        }

        .game-title {
          font-size: 4rem;
          font-weight: 900;
          background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 60px rgba(168, 85, 247, 0.4);
          letter-spacing: -2px;
          text-align: center;
          animation: titleGlow 3s ease-in-out infinite;
        }

        @keyframes titleGlow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
        }

        .menu-subtitle {
          font-size: 1.3rem;
          color: #a5b4fc;
          text-align: center;
          max-width: 500px;
          line-height: 1.6;
        }

        .start-button {
          padding: 20px 60px;
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 20px 40px rgba(139, 92, 246, 0.4);
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .start-button:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 30px 60px rgba(139, 92, 246, 0.6);
        }

        /* Game HUD */
        .game-hud {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 20;
          display: flex;
          justify-content: space-between;
          padding: 30px 40px;
          background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 100%);
        }

        .hud-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 12px 24px;
          border-radius: 25px;
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .hud-label {
          color: #a5b4fc;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .hud-value {
          font-size: 1.5rem;
          font-weight: 800;
        }

        .lives-container {
          display: flex;
          gap: 8px;
        }

        .life-heart {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          clip-path: path('M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        .life-heart.lost {
          background: rgba(255,255,255,0.2);
          animation: none;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10%, 30% { transform: scale(1.1); }
        }

        .combo-badge {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          animation: comboPulse 0.6s ease-in-out infinite;
        }

        @keyframes comboPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        /* Game Arena */
        .game-arena {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90vw;
          max-width: 1200px;
          height: 70vh;
          border: 2px solid rgba(139, 92, 246, 0.3);
          border-radius: 30px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(5px);
        }

        /* Rocket */
        .rocket {
          position: absolute;
          left: 5%;
          transition: top 0.3s ease-out;
          filter: drop-shadow(0 0 20px rgba(96, 165, 250, 0.8));
          animation: rocketFloat 2s ease-in-out infinite;
        }

        @keyframes rocketFloat {
          0%, 100% { transform: translateY(-5px); }
          50% { transform: translateY(5px); }
        }

        /* Asteroids */
        .asteroid {
          position: absolute;
          right: 0;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: white;
          font-size: 1.2rem;
          animation: asteroidSpin 3s linear infinite;
          box-shadow: 0 0 30px rgba(220, 38, 38, 0.6);
          border: 3px solid rgba(255, 255, 255, 0.3);
        }

        @keyframes asteroidSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Particles */
        .particle {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          pointer-events: none;
        }

        /* Answer Panel */
        .answer-panel {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(20px);
          padding: 30px 50px;
          border-radius: 30px;
          border: 2px solid rgba(139, 92, 246, 0.4);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
          z-index: 15;
        }

        .problem-text {
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          text-align: center;
          margin-bottom: 20px;
          letter-spacing: 2px;
        }

        .answer-input-wrapper {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .answer-input {
          flex: 1;
          padding: 18px 25px;
          font-size: 1.8rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(139, 92, 246, 0.5);
          border-radius: 20px;
          color: white;
          text-align: center;
          outline: none;
          transition: all 0.3s;
        }

        .answer-input:focus {
          border-color: #8b5cf6;
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.4);
          background: rgba(255, 255, 255, 0.15);
        }

        .submit-btn {
          padding: 18px 40px;
          font-size: 1.3rem;
          font-weight: 700;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .submit-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.5);
        }

        /* Game Over Screen */
        .game-over-screen {
          position: relative;
          z-index: 30;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          gap: 30px;
        }

        .game-over-title {
          font-size: 4rem;
          font-weight: 900;
          color: #ef4444;
          text-shadow: 0 0 40px rgba(239, 68, 68, 0.6);
        }

        .final-stats {
          display: flex;
          gap: 40px;
        }

        .stat-box {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 30px 50px;
          border-radius: 25px;
          border: 1px solid rgba(255,255,255,0.2);
          text-align: center;
        }

        .stat-label {
          color: #a5b4fc;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }

        .stat-value {
          font-size: 3rem;
          font-weight: 900;
          color: white;
        }

        .restart-button {
          padding: 20px 60px;
          font-size: 1.3rem;
          font-weight: 700;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.4);
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .restart-button:hover {
          transform: translateY(-5px) scale(1.05);
        }
      `}</style>

      {/* Menu Screen */}
      {gameState === 'menu' && (
        <div className="menu-screen">
          <h1 className="game-title">🚀 ROCKET MATH BATTLE</h1>
          <p className="menu-subtitle">
            Defend your rocket by solving math problems! Each correct answer destroys an asteroid. 
            Wrong answers cost you lives. How long can you survive?
          </p>
          <button className="start-button" onClick={startGame}>
            Launch Mission
          </button>
        </div>
      )}

      {/* Playing Screen */}
      {gameState === 'playing' && (
        <>
          {/* HUD */}
          <div className="game-hud">
            <div className="hud-item">
              <Trophy size={24} color="#fbbf24" />
              <div>
                <div className="hud-label">Score</div>
                <div className="hud-value">{score}</div>
              </div>
            </div>
            
            <div className="hud-item">
              <Star size={24} color="#a78bfa" />
              <div>
                <div className="hud-label">Level</div>
                <div className="hud-value">{level}</div>
              </div>
            </div>

            {combo > 0 && (
              <div className="hud-item combo-badge">
                <Zap size={24} color="white" />
                <div>
                  <div className="hud-label">Combo</div>
                  <div className="hud-value">×{combo}</div>
                </div>
              </div>
            )}
            
            <div className="hud-item">
              <div className="lives-container">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={`life-heart ${i >= lives ? 'lost' : ''}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Game Arena */}
          <div className="game-arena">
            {/* Rocket */}
            <div className="rocket" style={{ top: `${rocketY}%` }}>
              <Rocket size={64} color="#60a5fa" fill="#60a5fa" />
            </div>

            {/* Asteroids */}
            {asteroids.map(asteroid => (
              <div
                key={asteroid.id}
                className="asteroid"
                style={{
                  left: `${asteroid.x}%`,
                  top: `${asteroid.y}%`,
                }}
              >
                <Target size={32} color="white" />
              </div>
            ))}

            {/* Particles */}
            {particles.map(particle => (
              <div
                key={particle.id}
                className="particle"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  backgroundColor: particle.color,
                  opacity: particle.life,
                }}
              />
            ))}
          </div>

          {/* Answer Panel */}
          {currentProblem && (
            <div className="answer-panel">
              <div className="problem-text">{currentProblem.question} = ?</div>
              <div className="answer-input-wrapper">
                <input
                  ref={inputRef}
                  type="number"
                  className="answer-input"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
                  placeholder="?"
                />
                <button className="submit-btn" onClick={submitAnswer}>
                  Fire!
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameOver' && (
        <div className="game-over-screen">
          <h1 className="game-over-title">MISSION FAILED</h1>
          <div className="final-stats">
            <div className="stat-box">
              <div className="stat-label">Final Score</div>
              <div className="stat-value">{score}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Level Reached</div>
              <div className="stat-value">{level}</div>
            </div>
          </div>
          <button className="restart-button" onClick={startGame}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default App;