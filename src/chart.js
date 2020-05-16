import React, { useEffect, useState } from 'react';
import './App.css';
import moment from 'moment';
import Chart from 'chart.js';
import { csv } from 'd3';
import { Line } from 'react-chartjs-2';
import data from './data/worldwide.csv';

export default function CountryChart(props) {
  const [country, updateCountry] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [momentdate, updateDate] = useState([]);
  const [deaths, updateDeaths] = useState([]);
  const [recovered, updateRecovered] = useState([]);
  const [confirmed, updateConfirmed] = useState([]);

  useEffect(() => {
    setisLoading(true);

    csv(data).then((data) => {
      console.log(data[0]);
      //set timeseries data to momentdate
      data.map((day) => {
        // console.log();
        updateDate((days) => [...days, moment(day.Date).format('MMM Do')]);
        updateDeaths((death) => [...death, day.Deaths]);
        updateRecovered((recovery) => [...recovery, day.Recovered]);
        updateConfirmed((confirm) => [...confirm, day.Confirmed]);
      });
      //set confirmed cases

      //set death cases

      //set recovered cases
    });

    setisLoading(false);
  }, []);

  // console.log('moment date', momentdate);

  const state = {
    labels: momentdate,
    // labels: [2, 32, 43, 4, 5],
    datasets: [
      {
        label: 'Confirmed',
        fill: false,
        lineTension: 0,
        backgroundColor: 'purple',
        borderColor: 'purple',
        borderWidth: 2,
        pointBorderColor: 'green',
        pointRadius: 0,
        data: confirmed,
      },
      {
        label: 'Deaths',
        fill: false,
        lineTension: 0,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 2,
        pointBorderColor: 'red',
        pointRadius: 0,
        data: deaths,
      },
      {
        label: 'Recovered',
        fill: false,
        pointRadius: 0,
        // backgroundColor: 'red',
        borderColor: 'green',
        pointBorderColor: 'green',
        data: recovered,
      },
    ],
  };

  return isLoading ? (
    <div> chart is loading</div>
  ) : (
    <div className='chart'>
      <div>
        <Line
          data={state}
          options={{
            tooltips: {
              callbacks: {
                title: function (tooltipItem, data) {
                  return data['labels'][tooltipItem[0]['index']];
                },
                label: function (tooltipItem, data) {
                  return data['datasets'][0]['data'][tooltipItem['index']];
                },
              },
            },
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'Deaths',
                    fontColor: '#61822F',
                    fontSize: 40,
                    // labels: momentdate,
                  },

                  ticks: {
                    callback: function (value) {
                      return value;
                    },
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'Date',
                    fontColor: '#61822F',
                    fontSize: 25,
                  },
                },
              ],
            },

            title: {
              display: true,
              text: 'World Coronavirus Deaths',
              fontSize: 30,
              // color: 'red',
              fontColor: 'red',
            },
            legend: {
              display: true,
              position: 'top',
            },
          }}
        />
      </div>
    </div>
  );
}
