import React, { useState, useEffect } from 'react';
import './textbox.css';
import './App.css';

export default function TextBox({ countryData }) {
  // useEffect(() => {});
  console.log('countrydata in textbox', countryData);
  return (
    <div className='textbox'>
      <div className='country'> {countryData.Country_Region}</div>
      <div>Confirmed: {countryData.Confirmed}</div>
      <div>Recovered: {countryData.Recovered}</div>
      <div>Deaths: {countryData.Deaths}</div>
    </div>
  );
}
