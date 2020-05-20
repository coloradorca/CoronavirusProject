import React from 'react';
import './App.css';

export default function Nav({ toggle, toggleChart, changeStatistics }) {
  return (
    <div className='buttons'>
      <button className='toggleBtn' onClick={toggle}>
        ESRI / OpenLayers Map
      </button>
      <button className='toggleCountry' onClick={toggleChart}>
        World/Country Chart
      </button>
    </div>
  );
}
