import React, { useState } from 'react';
import './App.css';

export default function Nav({ chart, toggle, toggleChart, changeStatistics }) {
  const [isLoading, setLoading] = useState(false);

  const changeState = () => {
    setLoading(!isLoading);
  };

  return (
    <div className='buttons'>
      <button
        className='toggleMap'
        variant='primary'
        onClick={() => (toggle(), changeState())}>
        {' '}
        {isLoading ? 'Show ESRI map' : 'Show OpenLayers Map'}
      </button>
      <div></div>
      {!chart ? (
        <div />
      ) : (
        <button className='toggleCountry' onClick={toggleChart}>
          Show World Chart
        </button>
      )}
    </div>
  );
}
