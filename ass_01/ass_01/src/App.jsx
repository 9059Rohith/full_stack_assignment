import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TabBar from './components/TabBar';
import Factorial from './components/Factorial';
import Fibonacci from './components/Fibonacci';
import Prime from './components/Prime';

const App = () => {
  const [activeTab, setActiveTab] = useState('factorial');
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const renderActiveComponent = () => {
    const props = { input, setInput, result, setResult };
    switch (activeTab) {
      case 'factorial': return <Factorial {...props} />;
      case 'fibonacci': return <Fibonacci {...props} />;
      case 'prime': return <Prime {...props} />;
      default: return <Factorial {...props} />;
    }
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
      <Navbar />
      <div style={styles.mainLayout}>
        <section style={styles.card}>
          <TabBar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setResult(null); setInput(''); }} />
          {renderActiveComponent()}
        </section>
        <section style={styles.card}>
          <div style={styles.avatar}>RD</div>
          <h2 style={{ marginTop: 0, marginBottom: '10px' }}>Math Operations Hub</h2>
          <p style={{ color: '#64748b', fontSize: '18px', lineHeight: '1.6', margin: 0 }}>
            Perform mathematical operations efficiently. Calculate factorials, generate Fibonacci series, and check prime numbers with ease.
          </p>
          <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
            <span style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: '30px', fontSize: '14px', fontWeight: '600' }}>ReactJS</span>
            <span style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: '30px', fontSize: '14px', fontWeight: '600' }}>Mathematics</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;