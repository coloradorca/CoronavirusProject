import React, { useRef, useEffect } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { defaults, ScaleLine } from 'ol/control';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import SourceOSM from 'ol/source/OSM.js';

import countryLines from './data/countries.geojson';

export default function OpenLayers() {
  const mapRef = useRef();

  useEffect(() => {
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        url: countryLines,
        format: new GeoJSON(),
      }),
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

    map.on('pointerdown', function (evt) {
      console.log('click event');
      if (evt.dragging) {
        return;
      }
      var pixel = map.getEventPixel(evt.originalEvent);
      console.log(pixel);
    });
  }, []);

  return <div className='webmap' ref={mapRef}></div>;
}
