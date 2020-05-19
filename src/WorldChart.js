import React, { useEffect, useState } from 'react';
import './App.css';
import moment from 'moment';
// import Chart from 'chart.js';
import { csv } from 'd3';
import { Line } from 'react-chartjs-2';
import data from './data/worldwide.csv';

export default function WorldChart({ showChart, changeStatistics, setWorld }) {
  // const [country, updateCountry] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [momentdate, updateDate] = useState([]);
  const [deaths, updateDeaths] = useState([]);
  const [recovered, updateRecovered] = useState([]);
  const [confirmed, updateConfirmed] = useState([]);

  useEffect(() => {
    setisLoading(true);
    //set timeseries from csv file
    csv(data).then((data) => {
      setWorld(data[data.length - 1]);
      changeStatistics(data[data.length - 1]);
      data.forEach((day) => {
        //add dates to chart
        updateDate((days) => [...days, moment(day.Date).format('MMM Do')]);
        //add & update deaths
        updateDeaths((death) => [...death, day.Deaths]);
        //add & update recovered cases
        updateRecovered((recovery) => [...recovery, day.Recovered]);
        //add & update confirmed cases
        updateConfirmed((confirm) => [...confirm, day.Confirmed]);
      });
    });

    setisLoading(false);
  }, [changeStatistics]);

  const state = {
    labels: momentdate,
    datasets: [
      {
        label: 'Confirmed',
        fill: false,
        borderColor: 'purple',
        borderWidth: 5,
        pointRadius: 0,
        data: confirmed,
      },
      {
        label: 'Deaths',
        fill: false,
        borderColor: 'red',
        borderWidth: 5,
        pointRadius: 0,
        data: deaths,
      },
      {
        label: 'Recovered',
        fill: false,
        borderColor: 'green',
        borderWidth: 5,
        pointRadius: 0,
        data: recovered,
      },
    ],
  };

  return isLoading || showChart ? (
    <div> </div>
  ) : (
    <div className='chart'>
      <div>
        <Line
          data={state}
          options={{
            tooltips: {
              titleFontSize: 40,
              bodyFontSize: 40,
              bodySpacing: 4,
              custom: function (tooltip) {
                if (!tooltip) return;
                // disable displaying the color box;
                tooltip.displayColors = false;
              },
              callbacks: {
                title: function (tooltipItem, data) {
                  return data['labels'][tooltipItem[0]['index']];
                },
                label: function (tooltipItem, data) {
                  return `Amount: ${
                    data['datasets'][0]['data'][tooltipItem['index']]
                  }`;
                },
              },
            },
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'Cases',
                    fontColor: '#61822F',
                    fontSize: 40,
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
