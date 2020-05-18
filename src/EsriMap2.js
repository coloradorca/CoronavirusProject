import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import { queryFeatures, createQuery } from '@esri/arcgis-rest-feature-layer';
import './App.css';

export default function EsriMap2({ toggle }) {
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
          'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/2?f=pjson',
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
      function countryQuery() {
        var query = covidLayer.createQuery();
        // query.where = '1 = 1';
        // query.returnCountOnly = true;
        // query.geometry =
        query.f = 'json';
        // query.spatialRelationship = 'intersects';
        return covidLayer.queryFeatures(query);
      }

      countryQuery().then((results) =>
        console.log(results['__accessor__'].spatialReference),
      );

      //toggle the featurelayer external to map

      if (toggle) {
        map.add(covidLayer, 0);
      }
      map.add(covidLayer);

      return () => {
        if (view) {
          view.container = null;
        }
      };
    });
  });

  return <div className='webmap' ref={mapRef} />;
}
