import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import { queryFeatures } from '@esri/arcgis-rest-feature-layer';
import './App.css';

export default function EsriMap({ toggle }) {
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
      var countryQuery = covidLayer.createQuery();

      covidLayer.queryFeatures(countryQuery).then(function (response) {
        console.log(response.features[0]['__accessor__']);
        // do something with the query results
      });

      //toggle the featurelayer external to map
      if (toggle) {
        map.add(covidLayer, 0);
      }

      return () => {
        if (view) {
          view.container = null;
        }
      };
    });
  });

  return <div className='webmap' ref={mapRef} />;
}
