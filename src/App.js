import React, { useState } from 'react';
import './App.css';
import Map from './map.js';
import Nav from './nav.js';
import WorldChart from './chart.js';

function App() {
  const [state, setState] = useState(true);
  const [chart, changeChart] = useState(false);

  //function to toggle feature layer
  function toggle() {
    setState(!state);
  }
  function toggleChart() {
    changeChart(!chart);
  }
  return (
    <div className='App'>
      <div>
        <header className='App-header'>Coronavirus Project</header>
      </div>
      <div>
        <Nav toggle={toggle} toggleChart={toggleChart} />
      </div>
      <div className='wrapper'>
        <div className='esrimap'>
          <Map toggle={state} />
        </div>
        <div className='chart1'>{/* <WorldChart showChart={chart} /> */}</div>
      </div>
    </div>
  );
}

export default App;
