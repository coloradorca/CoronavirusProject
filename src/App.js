import React, { useState } from 'react';
import './App.css';
import Map from './map.js';
import Nav from './nav.js';
import WorldChart from './WorldChart.js';
import CountryChart from './countryChart.js';
import EsriMap from './EsriMap.js';

export default function App() {
  const [state, setState] = useState(true);
  const [chart, changeChart] = useState(false);

  //function to toggle feature layer
  function toggle() {
    setState(!state);
  }
  function toggleChart(e) {
    e.preventDefault();
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
          <EsriMap toggle={state} />
          {/* <EsriMap2 toggle={state} /> */}
        </div>
        <div className='charts'>
          {/* <WorldChart showChart={chart} />
          <CountryChart showChart={chart} /> */}
        </div>
      </div>
    </div>
  );
}
