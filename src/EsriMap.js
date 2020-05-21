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
        "esri/widgets/Legend",
      ],
      { css: true },
    ).then(([ArcGISMap, MapView, FeatureLayer, Search, Legend]) => {

      //define the symbol for each marker displayed on map
      var defaultSym = {
        type: "simple-marker",
        color: [0, 0, 0, 0],
        outline: {
          color: "#E63946",
          width: 1
        }
      };
      //create the breakpoints for the size of circles displayed
      var renderer = {
        type: "simple",
        symbol: defaultSym,
        visualVariables: [
          {
            type: "size",
            field: "Confirmed",
            legendOptions: {
              title: "Amount of confirmed cases"
            },
            stops: [
              {
                value:1000,
                size: 4,
                label: "<1000"
              },
              {
                value: 2000,
                size: 10,
                label: "10-20k"
              },
              {
                value: 40000,
                size: 15,
                label: "20 - 40k"
              },
               {
                value: 80000,
                size: 25,
                label: ">80,000",
               }
            ]
          }
        ]
      };

      //function to serve as the popuptitle (conditional for rendering Province/state if available)
      const popupTitle = (feature) => {
        if(feature.graphic.attributes.Province_State){
          return `${feature.graphic.attributes.Province_State}, ${feature.graphic.attributes.Country_Region} `
        } else {
          return `${feature.graphic.attributes.Country_Region} `
        }
      }

      //featureLayer and data generated from ArcGis Rest Service
      var covidLayer = new FeatureLayer({
        url:
          'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1',
        renderer: renderer,
        title: "Coronavirus Cases",
        popupTemplate: {
          title: popupTitle,
          content:
            "{Deaths} people have died out of {Confirmed} Confirmed cases",
        },
        outFields: ['*'],
      });

      const map = new ArcGISMap({
        //change the basemap color/value here
        basemap: 'dark-gray',
        //add featureLayers to the map
        layers: [
          covidLayer,
                  // covid2Layer
        ]
      });

      //set the map's center point, zoom level/constraints, HTML output
      const view = new MapView({
        container: mapRef.current,
        map: map,
        //united states center
        // center: [-98, 33],
        //norway center
        center: [60,8],
          zoom: 3,
        constraints : {
          minZoom: 2,
          maxZoom: 7,
        }
      });

      //add search bar
      var search = new Search({
        view: view,
      });
      // Add the search widget to the top right corner of the view
      view.ui.add(search, {
        position: 'top-right',
      });

      // add a map legend
      // view.ui.add(
      //   new Legend({
      //     view: view
      //   }),
      //   "bottom-left"
      // );

      //click handler to select country
      view.on('click', function (event) {
        var screenPoint = {
          x: event.x,
          y: event.y,
        };

        // search for graphics at the clicked location
        view.hitTest(screenPoint).then(function (response) {
          if (response.results.length) {
            var graphic = response.results.filter(function (result) {
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
