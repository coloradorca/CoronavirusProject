import React, { useEffect, useRef, useState } from 'react';
import { loadModules } from 'esri-loader';
import './App.css';

export default function Map({ toggle }) {
  let mapRef = useRef();
  console.log('toggle in map component', toggle);
  useEffect(() => {
    loadModules(
      ['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer'],
      { css: true },
    ).then(([ArcGISMap, MapView, FeatureLayer]) => {
      const map = new ArcGISMap({
        //change the basemap color/value here
        basemap: 'gray',
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
      });

      //set a placehorder featurelayer, potentially update later
      var normalLayer = new FeatureLayer({
        url:
          'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/Joshua_Tree_Climbs/FeatureServer',
      });

      toggle ? map.add(covidLayer, 1) : map.add(normalLayer, 1);

      return () => {
        if (view) {
          view.container = null;
        }
      };
    });
  });
  return <div className='webmap' ref={mapRef} />;
}
