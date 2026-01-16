import React from 'react';

const ProblemDisplay = ({ problem, userAnswer, setUserAnswer, onSubmit, inputRef }) => {
  if (!problem) return null;

  return (
    <div className="problem-container">
      <div className="problem-text">
        {problem.question} = ?
      </div>
      <input
        ref={inputRef}
        type="number"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
        className="answer-input"
        placeholder="Your answer"
        autoFocus
      />
      <button onClick={onSubmit} className="submit-button">
        Submit Answer
      </button>
    </div>
  );
};

export default ProblemDisplay;
