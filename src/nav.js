import React from 'react';
import './App.css';

export default function Nav({ toggle, toggleChart }) {
  return (
    <div className='buttons'>
      <button className='toggleBtn' onClick={toggle}>
        Add/Remove Feature Layer
      </button>
      <button className='toggleCountry' onClick={toggleChart}>
        World/Country Chart
      </button>
    </div>
  );
}
