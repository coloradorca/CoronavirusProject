import React, { useState } from 'react';
import './App.css';
import Map from './map.js';
import Nav from './nav.js';
import CountryChart from './chart.js';

function App() {
  const [state, setState] = useState(false);

  //function to toggle feature layer
  function toggle() {
    setState(!state);
    // alert('toggle clicked');
  }
  return (
    <div className='App'>
      <div>
        <header className='App-header'>Coronavirus Project</header>
      </div>
      <div>
        <Nav toggle={toggle} />
      </div>
      <div className='wrapper'>
        <div className='esrimap'>
          <Map toggle={state} />
        </div>
        <div className='chart1'>
          <CountryChart />
        </div>
      </div>
    </div>
  );
}

export default App;
