import React, { useRef, useEffect } from 'react';
// import ol from 'ol';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import LayerTile from 'ol/layer/Tile.js';
import SourceOSM from 'ol/source/OSM.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

export default function OpenLayers() {
  //create a react reference to the map
  let mapRef = useRef();

  useEffect(() => {
    var raster = new TileLayer({
      source: new XYZ({
        attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
      })
    });
    //instantiate the map
  const map = new Map({
    //set its target to the ref, ultimately displaying it in the correct div in return statement below
      target: mapRef.current,

      layers: [
        new LayerTile({
                source: new SourceOSM(),
              })
      ],
      //instantiate the view
      view: new View({
        center: [-11718716.28195593, 4869217.172379018],
        zoom: 13,
      }),
    });

  }, []);

  return <div className='webmap' ref={mapRef} />;
  // return <div>This is the OL map component</div>;
}

  //   const map = new Map({
  //     target: mapRef.current,
  //     layers: [
  //       new VectorLayer({
  //         source: new VectorSource({
  //           format: new GeoJSON(),
  //           url: './data/countries.geojson'
  //         }),
  //       }),
  //     ],
  //     view: new View({
  //       center: [12, 40],
  //       zoom: 2,
  //     }),
  //   });

  // }, []);