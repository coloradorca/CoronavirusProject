import React, { useEffect, useState } from 'react';
import { csv } from 'd3';
import data from './data/casesV2.csv';
import './App.css';

export default function Statistics({ maincountry, world }) {
  const [mortality, setMortality] = useState('');
  const [IncidentRate, setIncidentRate] = useState('');
  const [active, setActive] = useState('');

  useEffect(() => {

    //clear state for every change in country so that the stats don't remain on page if there is none for the selected country
    setMortality(() => '');
    setIncidentRate(() => '');
    setActive(() => '');

    csv(data).then((data) => {
      data.forEach((item) => {
        if (item['Country_Region'] === maincountry) {
          setMortality((prev) => item.Mortality_Rate);
          setIncidentRate((prev) => item.Incident_Rate);
          setActive((prev) => item.Active);
        }
      });
    });

  }, [maincountry, world]);

  //ensure that there is a country selected, there is data to display for the selected country and the data isn't being fetched
  return !maincountry || !mortality || !world ? (
    <div></div>
  ) : (
    <div className='statistics'>
      <div className='statistics'>
        Mortality Rate: {Number(mortality).toFixed(1)}
      </div>
      <div className='statistics'>
        Incident Rate: {Number(IncidentRate).toFixed(1)}
      </div>
      <div className='statistics'>Active Cases: {active}</div>
    </div>
  );
}
