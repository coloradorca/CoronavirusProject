import React from 'react';
import './App.css';
import moment from 'moment';

export default function TextBox({ countryData, world, worldData }) {
  //the textbox is wrapped in a large conditional if the world or nation chart is displaying,
  //with subsequent conditionals to render specific data
  return !world ? (
    <div className='textbox'>
      <p className='country'> World Statistics </p>
      <p>Last updated: {moment(worldData.Date).format('MMM Do YYYY')}</p>
      <p style={{ color: 'grey' }}>
        Confirmed: {Number(worldData.Confirmed).toLocaleString()}
      </p>
      <p style={{ color: 'blue' }}>
        Recovered: {Number(worldData.Recovered).toLocaleString()}
      </p>
      <p style={{ color: 'red' }}>
        Deaths: {Number(worldData.Deaths).toLocaleString()}
      </p>
    </div>
  ) : (
    <div className='textbox'>
      <div className='country'>
        {!countryData.Province_State ? (
          <p> {countryData.Country_Region} </p>
        ) : (
          <p>
            {' '}
            {countryData.Province_State +
              ', ' +
              countryData.Country_Region}{' '}
          </p>
        )}
      </div>
      <p style={{ color: 'grey' }}>
        Confirmed: {countryData.Confirmed.toLocaleString()}
      </p>
      {countryData.Recovered === 0 ? (
        <div> </div>
      ) : (
        <p style={{ color: 'blue' }}>
          Recovered: {countryData.Recovered.toLocaleString()}
        </p>
      )}
      <p style={{ color: 'red' }}>
        Deaths: {countryData.Deaths.toLocaleString()}
      </p>
    </div>
  );
}
