import React, { useState } from 'react';
import './App.css';
import Nav from './nav.js';
import WorldChart from './WorldChart.js';
import CountryChart from './countryChart.js';
import EsriMap from './EsriMap.js';
import OpenLayers from './OpenLayers.js';
import TextBox from './textbox.js';
import Statistics from './stats.js';

export default function App() {
  const [state, setState] = useState(true);
  const [chart, changeChart] = useState(false);
  const [current, changeCountry] = useState('');
  const [stats, changeStats] = useState('');
  const [worlds, setWorld] = useState([]);

  //function to toggle feature layer
  const toggle = () => {
    setState(!state);
  };
  //function to toggle the chart (word/country)
  const toggleChart = () => {
    changeChart(!chart);
  };

  return (
    <div className='App'>
      <div>
        <header className='App-header'>Coronavirus Project</header>
      </div>
      <div>
        <Nav
          chart={chart}
          toggle={toggle}
          toggleChart={toggleChart}
          changeStatistics={changeStats}
        />
      </div>
      <div className='wrapper'>
        {state ? (
          <div className='esrimap'>
            <EsriMap
              toggleChart={toggleChart}
              changeStatistics={changeStats}
              changeNation={changeCountry}
              appcountry={current}
              toggle={state}
            />
          </div>
        ) : (
          <div className='olMap'>
            <OpenLayers />
          </div>
        )}
        <div className='statsAndText'>
          {/* <div className='charts'> */}
          <div>
            <WorldChart
              changeStatistics={changeStats}
              showChart={chart}
              setWorld={setWorld}
            />
            <CountryChart maincountry={current} showChart={chart} />
          </div>
          {worlds.length === 0 ? (
            <div />
          ) : (
            <div className='text'>
              <TextBox world={chart} countryData={stats} worldData={worlds} />
              <div className='statistics'>
                <Statistics maincountry={current} world={chart} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
