import React, { useRef, useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { LayerTile } from 'ol/layer';
import SourceOSM from 'ol/source/OSM.js';
import VectorLayer from 'ol/source/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
// import XYZ from 'ol/source/XYZ';
// import { Fill, Stroke, Style, Text } from 'ol/style';

export default function OpenLayers() {
  //create a react reference to the map
  let mapRef = useRef();

  useEffect(() => {
    //instantiate the map
    const map = new Map({
      //set the target html element to render the map
      target: mapRef.current,
      //add layers
      layers: [
        new TileLayer({
          source: new SourceOSM(),
        }),

        // TODO:  Display the vector layer from the GeoJSON file

        // new VectorLayer({
        //   source: new VectorSource({
        //     format: new GeoJSON(),
        //     url: './data/countries.geojson',
        //   }),
        // }),
      ],
      //instantiate the view
      view: new View({
        center: [-11718716.28195593, 4869217.172379018],
        zoom: 13,
      }),
    });
  }, []);

  return <div className='webmap' ref={mapRef} />;
}
