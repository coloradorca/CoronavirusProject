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
  var changeNation = (country) => {
    // console.log(country);
    changeCountry(country);
  };

  var changeStatistics = (item) => {
    changeStats(item);
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
            changeStatistics={changeStatistics}
            changeNation={changeNation}
            appcountry={current}
            toggle={state}
          />
        </div>
        <div className='statsAndText'>
          <div className='charts'>
            <WorldChart changeStatistics={changeStatistics} showChart={chart} />
            <CountryChart maincountry={current} showChart={chart} />
          </div>
          <div className='text'>
            <TextBox countryData={stats} />
          </div>
        </div>
      </div>
    </div>
  );
}
