import React from 'react';

const Prime = ({ input, setInput, result, setResult }) => {
  const checkPrime = (n) => {
    if (n <= 1) return "❌ Not Prime (numbers ≤ 1 are not prime)";
    if (n === 2) return "✅ Prime Number";
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return `❌ Not Prime (divisible by ${i})`;
    }
    return "✅ Prime Number";
  };

  const handleCalculate = () => {
    const num = parseFloat(input);
    if (isNaN(num)) {
      setResult("Invalid input");
      return;
    }
    setResult(checkPrime(num));
  };

  return (
    <div className="calculator-section">
      <h2>🔍 Prime Number Checker</h2>
      <p className="description">Check if a number is prime</p>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a number"
        onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
      />
      <button onClick={handleCalculate}>Check Prime</button>
      {result && (
        <div className="result-box">
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  );
};

export default Prime;
