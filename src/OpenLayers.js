import React, { useRef, useEffect } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { defaults, ScaleLine } from 'ol/control';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import SourceOSM from 'ol/source/OSM.js';
import { Fill, Stroke, Style, Text, Circle } from 'ol/style';

import countryLines from './data/countries.geojson';

export default function OpenLayers() {
  const mapRef = useRef();

  // var style = new Style({
  //   fill: new Fill({
  //     color: 'rgba(255, 255, 255, 0.6)'
  //   }),
  //   stroke: new Stroke({
  //     color: '#319FD3',
  //     width: 1
  //   }),
  //   text: new Text({
  //     font: '12px Calibri,sans-serif',
  //     fill: new Fill({
  //       color: '#000'
  //     }),
  //     stroke: new Stroke({
  //       color: '#fff',
  //       width: 3
  //     })
  //   })
  // });

  useEffect(() => {
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        url: countryLines,
        format: new GeoJSON(),
      }),
      // style: function(feature) {
      //     style.getText().setText(feature.get('name'));
      //     return style;
      // }
    });

    const sourceMap = new TileLayer({
      title: 'annotation',
      source: new SourceOSM(),
    });

    const map = new Map({
      controls: new defaults({
        attributionOptions: {
          collapsible: false,
        },
        attribution: false,
      }).extend([new ScaleLine()]),
      target: mapRef.current,
      layers: [sourceMap, vectorLayer],
      view: new View({
        center: [-11718716.28195593, 4869217.172379018],
        zoom: 1.5,
      }),
    });
  }, []);

  return <div className='webmap' ref={mapRef}></div>;
}
