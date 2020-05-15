import React from 'react';
import './App.css';

export default function Nav({ toggle }) {
  return (
    <div>
      <button className='toggleBtn' onClick={toggle}>
        Toggle Cases
      </button>
    </div>
  );
}
