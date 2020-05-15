import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import './App.css';

export default function Map() {
  let mapRef = useRef();

  useEffect(() => {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(
      ['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer'],
      { css: true },
    ).then(([ArcGISMap, MapView, FeatureLayer]) => {
      const map = new ArcGISMap({
        basemap: 'gray',
        layers: [],
      });

      const view = new MapView({
        container: mapRef.current,
        map: map,
        center: [-98.57, 40],
        zoom: 2,
      });

      var covidLayer = new FeatureLayer({
        url:
          'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1',
      });

      map.add(covidLayer, 1);

      return () => {
        if (view) {
          view.container = null;
        }
      };
    });
  });
  return <div className='webmap' ref={mapRef} />;
}
