import React from 'react';
import HelloModal from '../components/HelloModal';

export default function() {
  return (
    <h2 className="app-nav-item" style={{ borderColor: 'red' }}>
      Home
      <HelloModal />
    </h2>
  );
}
