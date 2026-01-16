import React, { useState } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('factorial');
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const calculateFactorial = (n) => {
    if (n < 0) return "Error: Negative";
    if (n > 170) return "Infinity";
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res.toLocaleString();
  };

  const generateFibonacci = (n) => {
    if (n <= 0) return "Enter positive integer";
    let series = [0, 1];
    if (n === 1) return "0";
    for (let i = 2; i < n; i++) series.push(series[i - 1] + series[i - 2]);
    return series.slice(0, n).join(' → ');
  };

  const checkPrime = (n) => {
    if (n <= 1) return "❌ Not Prime";
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return `❌ Not Prime`;
    }
    return "✅ Prime Number";
  };

  const handleCalculate = () => {
    const num = parseFloat(input);
    if (isNaN(num)) return setResult("Invalid input");
    if (activeTab === 'factorial') setResult(calculateFactorial(num));
    if (activeTab === 'fibonacci') setResult(generateFibonacci(num));
    if (activeTab === 'prime') setResult(checkPrime(num));
  };

  const styles = {
    pageWrapper: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#f8fafc',
      margin: 0,
      padding: 0,
      fontFamily: "'Inter', sans-serif"
    },
    navbar: {
      width: '100%',
      height: '70px',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 5%',
      boxSizing: 'border-box',
      borderBottom: '1px solid #e2e8f0'
    },
    mainLayout: {
      flex: 1,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '40px',
      padding: '5%',
      boxSizing: 'border-box'
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '24px',
      padding: '40px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      height: 'fit-content'
    },
    tabBar: {
      display: 'flex',
      background: '#f1f5f9',
      padding: '6px',
      borderRadius: '14px',
      marginBottom: '30px'
    },
    tabBtn: (isActive) => ({
      flex: 1,
      padding: '14px',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontWeight: '700',
      transition: '0.3s',
      backgroundColor: isActive ? '#4f46e5' : 'transparent',
      color: isActive ? '#ffffff' : '#64748b'
    }),
    input: {
      width: '100%',
      padding: '18px',
      borderRadius: '12px',
      border: '2px solid #e2e8f0',
      fontSize: '18px',
      marginBottom: '20px',
      boxSizing: 'border-box',
      outline: 'none'
    },
    calcBtn: {
      width: '100%',
      padding: '18px',
      backgroundColor: '#4f46e5',
      color: '#ffffff',
      border: 'none',
      borderRadius: '12px',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer'
    },
    resultBox: {
      marginTop: '30px',
      padding: '20px',
      backgroundColor: '#f5f3ff',
      borderRadius: '12px',
      borderLeft: '6px solid #4f46e5'
    },
    avatar: {
      width: '90px',
      height: '90px',
      borderRadius: '25px',
      background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '20px',
      boxShadow: '0 10px 15px rgba(79, 70, 229, 0.2)'
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <nav style={styles.navbar}>
        <h1 style={{ color: '#4f46e5', margin: 0 }}>MathPro</h1>
        <div style={{ display: 'flex', gap: '30px', color: '#64748b', fontWeight: '600' }}>
          <span>Tools</span>
          <span>Contact</span>
        </div>
      </nav>

      <div style={styles.mainLayout}>
        {/* Left Side: Calculator */}
        <section style={styles.card}>
          <h2 style={{ marginTop: 0, marginBottom: '25px', fontSize: '28px' }}>Calculator</h2>
          <div style={styles.tabBar}>
            {['factorial', 'fibonacci', 'prime'].map((t) => (
              <button 
                key={t}
                style={styles.tabBtn(activeTab === t)} 
                onClick={() => {setActiveTab(t); setResult(null);}}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <input 
            style={styles.input}
            type="number" 
            placeholder={activeTab === 'fibonacci' ? "Number of terms..." : "Enter a number..."} 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
          />
          
          <button style={styles.calcBtn} onClick={handleCalculate}>Calculate Now</button>

          {result !== null && (
            <div style={styles.resultBox}>
              <small style={{ color: '#4f46e5', fontWeight: '800', letterSpacing: '1px' }}>RESULT</small>
              <div style={{ fontSize: '22px', fontWeight: '600', marginTop: '5px', wordBreak: 'break-all' }}>{result}</div>
            </div>
          )}
        </section>

        {/* Right Side: Author Card */}
        <section style={styles.card}>
          <div style={styles.avatar}>JD</div>
          <h2 style={{ marginTop: 0, marginBottom: '10px' }}>The Developer</h2>
          <p style={{ color: '#64748b', fontSize: '18px', lineHeight: '1.6', margin: 0 }}>
            Specializing in high-performance React applications. This toolkit is designed to provide 
            instant mathematical results with a clean, user-friendly interface.
          </p>
          <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
            <span style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: '30px', fontSize: '14px', fontWeight: '600' }}>Engineer</span>
            <span style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: '30px', fontSize: '14px', fontWeight: '600' }}>Creator</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;