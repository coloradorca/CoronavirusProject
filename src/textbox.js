import React from 'react';
import './textbox.css';
import './App.css';

export default function TextBox({ countryData, world }) {
  console.log('countrydata in textbox', countryData);
  console.log(world);

  return !world ? (
    <div className='textbox'>
      <p>Confirmed: {countryData.Confirmed}</p>
      <p>Recovered: {countryData.Recovered}</p>
      <p>Deaths: {countryData.Deaths}</p>
    </div>
  ) : (
    <div className='textbox'>
      <div className='country'>
        {countryData.Province_State === null
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
