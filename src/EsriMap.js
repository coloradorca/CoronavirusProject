import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import { queryFeatures, createQuery } from '@esri/arcgis-rest-feature-layer';
import './App.css';

export default function EsriMap({ toggle, changeNation }) {
  let mapRef = useRef();

  useEffect(() => {
    loadModules(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/layers/FeatureLayer',
        'esri/widgets/Search',
      ],
      { css: true },
    ).then(([ArcGISMap, MapView, FeatureLayer, Search]) => {
      const map = new ArcGISMap({
        //change the basemap color/value here
        basemap: 'dark-gray',
        layers: [],
      });

      //set the map's center point and zoom level
      const view = new MapView({
        container: mapRef.current,
        map: map,
        center: [-12, 41.76],
        zoom: 2,
      });

      //featureLayer displaying red circles of coronavirus cases
      var covidLayer = new FeatureLayer({
        url:
          'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1',
        outFields: ['*'],
      });

      //add search bar
      var node = new Search({
        view: view,
      });
      // Add the search widget to the top right corner of the view
      view.ui.add(node, {
        position: 'top-right',
      });

      //TODO :
      //query the feature layer
      // function countryQuery() {
      //   var query = covidLayer.createQuery();
      //   query.where = '1 = 1';
      //   query.returnCountOnly = true;
      //   query.f = 'json';
      //   query.outFields = 'Country_Region, Confirmed, Recovered, Deaths';
      //   return covidLayer.queryFeatures(query);
      // }

      // countryQuery().then((results) => console.log(results.fields));

      //toggle the featurelayer via button on main page (nav component)
      if (toggle) {
        map.add(covidLayer, 0);
      }

      view.on('click', function (event) {
        var screenPoint = {
          x: event.x,
          y: event.y,
        };

        // Search for graphics at the clicked location
        view.hitTest(screenPoint).then(function (response) {
          if (response.results.length) {
            var graphic = response.results.filter(function (result) {
              // check if the graphic belongs to the covid feature layer
              return result.graphic.layer === covidLayer;
            })[0].graphic;
            //set the country clicked back up to main App component, changing the chart
            changeNation(graphic.attributes.Country_Region);

            //get information from the selected country
            // console.log(graphic.attributes.Country_Region);
          }
        });
      });

      return () => {
        if (view) {
          view.container = null;
        }
      };
    });
  });

  return <div className='webmap' ref={mapRef} />;
}
