import React from 'react';

const Factorial = ({ input, setInput, result, setResult }) => {
  const calculateFactorial = (n) => {
    if (n < 0) return "Error: Negative numbers not allowed";
    if (n > 170) return "Infinity";
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res.toLocaleString();
  };

  const handleCalculate = () => {
    const num = parseFloat(input);
    if (isNaN(num)) {
      setResult("Invalid input");
      return;
    }
    setResult(calculateFactorial(num));
  };

  return (
    <div className="calculator-section">
      <h2>🔢 Factorial Calculator</h2>
      <p className="description">Calculate factorial (n!) of a number</p>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a number"
        onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
      />
      <button onClick={handleCalculate}>Calculate Factorial</button>
      {result && (
        <div className="result-box">
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  );
};

export default Factorial;
