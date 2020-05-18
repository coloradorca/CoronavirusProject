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
  const [current, changeCountry] = useState('Iceland');

  //function to toggle feature layer
  const toggle = () => {
    setState(!state);
  };
  //function to toggle the chart (word/country)
  const toggleChart = () => {
    changeChart(!chart);
  };
  //function to change the selected country
  var changeNation = (country) => {
    // console.log(country);
    changeCountry(country);
  };

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
          <EsriMap
            changeNation={changeNation}
            appcountry={current}
            toggle={state}
          />
        </div>
        <div className='charts'>
          <WorldChart showChart={chart} />
          <CountryChart maincountry={current} showChart={chart} />
        </div>
      </div>
    </div>
  );
}
