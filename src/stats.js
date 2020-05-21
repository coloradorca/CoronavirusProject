import React, {useEffect, useState } from 'react'
import moment from 'moment';
import { csv } from 'd3';
import data from './data/casesV2.csv';
import './App.css'


export default function Statistics({maincountry}){
  const [stats, setStats] = useState(false)
  const [isLoading, setisLoading] = useState(false);
  const [mortality, setMortality] = useState('')
  const [hosptitalized, setHosptitalized] = useState('')
  const [tested, setTested] = useState('')
  const [IncidentRate, setIncidentRate] = useState('')
  const [active, setActive] = useState('')

  // Active,Incident_Rate,People_Tested,People_Hospitalized,Mortality_Rate

  useEffect(() => {
    setisLoading(true);
    csv(data).then((data) => {
      // console.log("maincountry passed from app", maincountry)
      data.forEach((item) => {
        // console.log(item['Country_Region'])
        if(item['Country_Region'] === maincountry){
          console.log('mortality rate', item['Mortality_Rate'])
          console.log('hospitalized', item['People_Hospitalized'])
          console.log('active', item['Active'])
          console.log('Incidence Rate', item['Incident_Rate'])
          setMortality((prev) =>  item.Mortality_Rate)
          setIncidentRate((prev)=> item.Incident_Rate)
          setActive((prev) => item.Active)
          setStats(!stats)
        }
      })

    })


    setisLoading(false);
  }, [maincountry]);
  return (
    !maincountry || stats || isLoading ? (<div></div>) :
    (
    <div className='statistics'>
      <div className='statistics'>Mortality Rate: {Number(mortality).toFixed(3)}</div>
      <div className='statistics'>Incident Rate: {Number(IncidentRate).toFixed(3)}</div>
      <div className='statistics'>Active: {active}</div>
    </div>
    )
  )
}