import React from 'react';
import './App.css';

export default function Nav({ toggle, toggleChart }) {
  return (
    <div className='buttons'>
      <button className='toggleBtn' onClick={toggle}>
        Toggle Cases
      </button>
      <button className='toggleBtn' onClick={toggleChart}>
        Toggle Chart
      </button>
    </div>
  );
}
