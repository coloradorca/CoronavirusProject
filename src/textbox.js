import React from 'react';
import './textbox.css';
import './App.css';

export default function TextBox({ countryData, world, worldData }) {
  return !world ? (
    <div className='textbox'>
      <p>Confirmed: {worldData.Confirmed}</p>
      <p>Recovered: {worldData.Recovered}</p>
      <p>Deaths: {worldData.Deaths}</p>
    </div>
  ) : (
    <div className='textbox'>
      <div className='country'>
        {!countryData.Province_State
          ? countryData.Country_Region
          : countryData.Country_Region + ', '}
      </div>
      <div className='state'>{countryData.Province_State}</div>
      <div>Confirmed: {countryData.Confirmed}</div>
      {countryData.Recovered === 0 ? (
        <div> </div>
      ) : (
        <div>Recovered: {countryData.Recovered}</div>
      )}
      <div>Deaths: {countryData.Deaths}</div>
    </div>
  );
}
