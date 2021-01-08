import React from 'react';
import { Link } from 'react-router-dom';

export default function() {
  return (
    <h2 className="app-nav-item" style={{ borderColor: 'red' }}>
      Home
      <Link to="/pms">click me</Link>
    </h2>
  );
}
