import React from 'react';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>
        <span style={styles.icon}>📐</span>
        <h1 style={styles.title}>Math Operations</h1>
      </div>
      <div style={styles.info}>
        <span style={styles.badge}>ReactJS</span>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    width: '100%',
    height: '70px',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 5%',
    boxSizing: 'border-box',
    borderBottom: '1px solid #e2e8f0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  icon: {
    fontSize: '28px'
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0
  },
  info: {
    display: 'flex',
    gap: '12px'
  },
  badge: {
    padding: '8px 16px',
    backgroundColor: '#4f46e5',
    color: 'white',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600'
  }
};

export default Navbar;
