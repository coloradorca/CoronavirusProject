import React, { useState } from 'react';
import './App.css';
import Nav from './nav.js';
import WorldChart from './WorldChart.js';
import CountryChart from './countryChart.js';
import EsriMap from './EsriMap.js';
import TextBox from './textbox.js';

export default function App() {
  const [state, setState] = useState(true);
  const [chart, changeChart] = useState(false);
  const [current, changeCountry] = useState('Iceland');
  const [stats, changeStats] = useState('');

  //function to toggle feature layer
  const toggle = () => {
    setState(!state);
  };
  //function to toggle the chart (word/country)
  const toggleChart = () => {
    changeChart(!chart);
  };
  //function to change the selected country

  return (
    <div className='App'>
      <div>
        <header className='App-header'>Coronavirus Project</header>
      </div>
      <div>
        <Nav
          toggle={toggle}
          toggleChart={toggleChart}
          changeStatistics={changeStats}
        />
      </div>
      <div className='wrapper'>
        <div className='esrimap'>
          <EsriMap
            toggleChart={toggleChart}
            changeStatistics={changeStats}
            changeNation={changeCountry}
            appcountry={current}
            toggle={state}
          />
        </div>
        <div className='statsAndText'>
          <div className='charts'>
            <WorldChart changeStatistics={changeStats} showChart={chart} />
            <CountryChart maincountry={current} showChart={chart} />
          </div>
          <div className='text'>
            <TextBox world={chart} countryData={stats} />
          </div>
        </div>
      </div>
    </div>
  );
}
