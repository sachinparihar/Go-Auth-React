// Navigation.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Link to="/charts/delhiKings" style={{ padding: '10px', border: '1px solid', borderRadius: '5px' }}>Delhi Kings Data</Link>
      <Link to="/charts/himachal" style={{ padding: '10px', border: '1px solid', borderRadius: '5px' }}>Himachal Data</Link>
      <Link to="/charts/vijayLaxmi" style={{ padding: '10px', border: '1px solid', borderRadius: '5px' }}>Vijay Laxmi Data</Link>
      <Link to="/charts/dubaiKing" style={{ padding: '10px', border: '1px solid', borderRadius: '5px' }}>Dubai King Data</Link>
    </nav>
  );
};

export default Navigation;