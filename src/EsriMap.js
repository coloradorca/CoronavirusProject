import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import './App.css';

export default function EsriMap({
  toggle,
  changeNation,
  changeStatistics,
  toggleChart,
}) {
  let mapRef = useRef();

  useEffect(() => {
    loadModules(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/layers/FeatureLayer',
        'esri/widgets/Search',
        'esri/widgets/Legend',
        'esri/widgets/Expand',
      ],
      { css: true },
    ).then(([ArcGISMap, MapView, FeatureLayer, Search, Legend, Expand]) => {

      //define the symbol for each marker displayed on map
      const defaultSym = {
        type: 'simple-marker',
        color: [0, 0, 0, 0],
        outline: {
          color: 'red',
          width: 1,
        },
      };

      //create the intervals for the size of circles displayed
      const renderer = {
        type: 'simple',
        symbol: defaultSym,
        visualVariables: [
          {
            type: 'size',
            field: 'Confirmed',
            legendOptions: {
              title: 'Amount of confirmed cases',
            },
            stops: [
              {
                value: 1000,
                size: 4,
                label: '<1000',
              },
              {
                value: 2000,
                size: 10,
                label: '10-20k',
              },
              {
                value: 40000,
                size: 15,
                label: '20 - 40k',
              },
              {
                value: 80000,
                size: 25,
                label: '>80,000',
              },
            ],
          },
        ],
      };

      //function to serve as the popup title (conditional for rendering Province/state if available)
      //returns a null value when click the next button on the popup
      var popupTitle = (feature) => {
        if (feature.graphic.attributes.Province_State) {
          return `${feature.graphic.attributes.Province_State}, ${feature.graphic.attributes.Country_Region} `;
        }
          return `${feature.graphic.attributes.Country_Region} `;

      };

      //Set the pop-up information
      const popup = {
        featureNavigationEnabled: false,
        overwriteActions: true,
        // title: popupTitle,
        title: `{Country_Region}`,
        content:
          '{Deaths} people have died out of {Confirmed} Confirmed cases',
      }

      //featureLayer and data generated from ArcGis Rest Service
      const covidLayer = new FeatureLayer({
        url:
          'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1',
        renderer: renderer,
        title: 'Coronavirus Cases',
        popupTemplate: popup,
        outFields: ['*'],
      });

      const map = new ArcGISMap({
        //change the basemap color/value here
        basemap: 'dark-gray',
        //add featureLayers to the map
        layers: [
          covidLayer
        ],
      });

      //set the map's center point, zoom level/constraints, HTML output
      const view = new MapView({
        container: mapRef.current,
        map: map,
        //united states center
        center: [-96, 33],
        //europe center
        // center: [20,30],
        zoom: 4,
        constraints: {
          minZoom: 2,
          maxZoom: 7,
        },
      });

      //add search bar widget
      const search = new Search({
        view: view,
        position: 'top-right',
      });
      //set search widget position
      view.ui.add(search, {
        position: 'top-right',
      });

      // add legend widget with the ability to expand it
      const legend = new Legend({
        view: view,
      });
      const legendExpand = new Expand({
        expandTooltip: 'Show Legend',
        expanded: false,
        view: view,
        content: legend,
      });

      view.ui.add(legendExpand, 'bottom-left');

      //click handler to select country
      view.on('click', function (event) {
        let screenPoint = {
          x: event.x,
          y: event.y,
        };

        // search for graphics at the clicked location
        view.hitTest(screenPoint).then(function (response) {
          if (response.results.length) {
            let graphic = response.results.filter(function (result) {
              // check if the graphic belongs to the covid feature layer
              return result.graphic.layer === covidLayer;
            })[0].graphic;
            // console.log(graphic.attributes)
            //set the country clicked back up to main App component
            changeNation(graphic.attributes.Country_Region);
            //get information from the selected country and change statistics
            changeStatistics(graphic.attributes);
            //toggle the country/ world chart
            toggleChart();
          }
        });
      });

      return () => {
        if (view) {
          view.container = null;
        }
      };
    });
  }, []);

  return <div className='webmap' ref={mapRef} />;
}
