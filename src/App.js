import React from 'react';
import './App.css';
import Map from './map.js';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>CoronaVirus Project</p>
        <div className='esrimap'>
          <Map />
        </div>
      </header>
    </div>
  );
}

export default App;
