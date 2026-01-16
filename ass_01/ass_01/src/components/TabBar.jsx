import React from 'react';

const TabBar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'factorial', label: 'Factorial', icon: '!' },
    { id: 'fibonacci', label: 'Fibonacci', icon: '∞' },
    { id: 'prime', label: 'Prime', icon: '🔒' }
  ];

  return (
    <div style={styles.tabBar}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={styles.tabBtn(activeTab === tab.id)}
        >
          <span style={styles.tabIcon}>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const styles = {
  tabBar: {
    display: 'flex',
    background: '#f1f5f9',
    padding: '6px',
    borderRadius: '14px',
    marginBottom: '30px',
    gap: '6px'
  },
  tabBtn: (isActive) => ({
    flex: 1,
    padding: '14px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '14px',
    transition: '0.3s',
    backgroundColor: isActive ? '#4f46e5' : 'transparent',
    color: isActive ? '#ffffff' : '#64748b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px'
  }),
  tabIcon: {
    fontSize: '16px'
  }
};

export default TabBar;
