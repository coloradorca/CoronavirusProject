import React, { useEffect, useState } from 'react';
import './App.css';
import moment from 'moment';
import { csv } from 'd3';
import { Line } from 'react-chartjs-2';
import data from './data/time-series.csv';

export default function CountryChart({ showChart, maincountry }) {
  // const [country, updateCountry] = useState('Iceland');
  const [isLoading, setisLoading] = useState(false);
  const [momentdate, updateDate] = useState([]);
  const [deaths, updateDeaths] = useState([]);
  const [recovered, updateRecovered] = useState([]);
  const [confirmed, updateConfirmed] = useState([]);

  useEffect(() => {
    setisLoading(true);

    //reset state to clear previous countries data
    updateDate((prev) => []);
    updateConfirmed((prev) => []);
    updateDeaths((prev) => []);
    updateRecovered((prev) => []);

    //set timeseries from csv file
    csv(data).then((data) => {
      // console.log(data[8899]['Country/Region']);
      data.forEach((item) => {
        //only show data since first death
        if (item['Deaths'] > 0) {
          //filter the data points to only include country selected
          if (item['Country/Region'] === `${maincountry}`) {
            //add dates to chart
            updateDate((days) => [...days, moment(item.Date).format('MMM Do')]);
            //add & update recovered cases
            updateRecovered((recovery) => [...recovery, item.Recovered]);
            //add & update confirmed cases
            updateConfirmed((confirm) => [...confirm, item.Confirmed]);
            //add & update deaths
            updateDeaths((death) => [...death, item.Deaths]);
          }
        }
      });
    });

    setisLoading(false);
    //set the useEffect listener to a change in the country
  }, [maincountry]);

  //set the data for the line chart from current state
  //set  the CSS properties for the line graph
  let state = {
    labels: momentdate,
    datasets: [
      {
        label: 'Confirmed',
        fill: false,
        lineTension: 0,
        backgroundColor: 'purple',
        borderColor: 'purple',
        borderWidth: 5,
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
        borderWidth: 5,
        pointBorderColor: 'red',
        pointRadius: 0,
        data: deaths,
      },
      {
        label: 'Recovered',
        fill: false,
        pointRadius: 0,
        borderColor: 'green',
        borderWidth: 5,
        pointBorderColor: 'green',
        data: recovered,
      },
    ],
  };

  //if the data is loading, or the world chart is displayed => render an empty div
  return isLoading || !showChart || !maincountry ? (
    <div></div>
  ) : (
    //if data loaded and world chart not selected, utilize the Line component from 'react-chartjs-2' library
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
              //these functions are for how the tooltip is displayed (on hover of specific line)
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
            //display of Title, Legend, x + y axis labels
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'Cases',
                    fontColor: '#61822F',
                    fontSize: 30,
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
              text: `${maincountry} (since first Death)`,
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
