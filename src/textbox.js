import React from 'react';
import './App.css';

export default function TextBox({ countryData, world, worldData }) {
  //the textbox is wrapped in a large conditional if the world or nation chart is displaying
  return !world ? (
    <div className='textbox'>
      <p> World Statistics</p>
      <p>Confirmed: {worldData.Confirmed}</p>
      <p>Recovered: {worldData.Recovered}</p>
      <p>Deaths: {worldData.Deaths}</p>
    </div>
  ) : (
    <div className='textbox'>
      <div className='country'>
        {!countryData.Province_State ? (
          <div> {countryData.Country_Region} </div>
        ) : (
          <div>
            {' '}
            {countryData.Province_State +
              ', ' +
              countryData.Country_Region}{' '}
          </div>
        )}
      </div>
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
