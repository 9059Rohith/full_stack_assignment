import React from 'react';

const Fibonacci = ({ input, setInput, result, setResult }) => {
  const generateFibonacci = (n) => {
    if (n <= 0) return "Enter a positive integer";
    let series = [0, 1];
    if (n === 1) return "0";
    for (let i = 2; i < n; i++) {
      series.push(series[i - 1] + series[i - 2]);
    }
    return series.slice(0, n).join(' → ');
  };

  const handleCalculate = () => {
    const num = parseFloat(input);
    if (isNaN(num)) {
      setResult("Invalid input");
      return;
    }
    setResult(generateFibonacci(num));
  };

  return (
    <div className="calculator-section">
      <h2>🌀 Fibonacci Series</h2>
      <p className="description">Generate Fibonacci series up to N terms</p>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter number of terms"
        onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
      />
      <button onClick={handleCalculate}>Generate Series</button>
      {result && (
        <div className="result-box">
          <strong>Series:</strong> {result}
        </div>
      )}
    </div>
  );
};

export default Fibonacci;
