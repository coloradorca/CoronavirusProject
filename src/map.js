// import React, { useEffect, useRef } from 'react';
// import { loadModules } from 'esri-loader';
// import { queryFeatures } from '@esri/arcgis-rest-feature-layer';
// import './App.css';

// export default function Map({ toggle }) {
//   // const [isLoading, setisLoading] = useState(false);
//   let mapRef = useRef();

//   useEffect(() => {
//     // setisLoading(true);
//     loadModules(
//       [
//         'esri/Map',
//         'esri/views/MapView',
//         'esri/layers/FeatureLayer',
//         'esri/layers/GraphicsLayer',
//         'esri/layers/CSVLayer',
//         'esri/widgets/Search',
//       ],
//       { css: true },
//     ).then(
//       ([
//         ArcGISMap,
//         MapView,
//         FeatureLayer,
//         GraphicsLayer,
//         Search,
//         // Graphic,
//         // CSVLayer,
//       ]) => {
//         const map = new ArcGISMap({
//           //change the basemap color/value here
//           basemap: 'gray',
//           layers: [],
//         });

//         //set the map's center point and zoom level
//         const view = new MapView({
//           container: mapRef.current,
//           map: map,
//           center: [-12, 41.76],
//           zoom: 2,
//         });

//         //featureLayer displaying red circles of coronavirus cases
//         // var covidLayer = new FeatureLayer({
//         //   url:
//         //     'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1',
//         // });

//         //add search bar
//         var node = new Search({
//           view: view,
//         });
//         // Add the search widget to the top right corner of the view
//         view.ui.add(node, {
//           position: 'top-right',
//         });

//         // if (toggle) {
//         //   map.add(covidLayer, 0);
//         // }

//         return () => {
//           if (view) {
//             view.container = null;
//           }
//         };
//       },
//     );
//     // setisLoading(false);
//   });

//   return <div className='webmap' ref={mapRef} />;
// }
// // return isLoading ? (
// //   <div>Loading Map</div>
// // ) : (
// //   <div className='webmap' ref={mapRef} />
// // );

// //embed this code within the click handler
// //  const options = {
// //   url:
// //     'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1',
// //   where: "Country_Region = 'US'",
// // };

// // queryFeatures(options).then((response) => {
// //   console.log(response.features); // 500
// // });

// //   view.whenLayerView(covidLayer).then(function (featureLayerView) {
// //     if (featureLayerView.updating) {
// //       var handle = featureLayerView.watch('updating', function (
// //         isUpdating,
// //       ) {
// //         if (!isUpdating) {
// //           // Execute the query
// //           featureLayerView.queryFeatures(query).then(function (result) {
// //             addGraphics(result);
// //           });
// //           handle.remove();
// //         }
// //       });
// //     } else {
// //       // Execute the query
// //       featureLayerView.queryFeatures(query).then(function (result) {
// //         console.log(result);
// //         addGraphics(result);
// //       });
// //     }
// //   });
// // }

// //get the co ordinates of click event
// // function showCoordinates(pt) {
// //   var coords =
// //     'Lat/Lon ' +
// //     pt.latitude.toFixed(3) +
// //     ' ' +
// //     pt.longitude.toFixed(3) +
// //     ' | Scale 1:' +
// //     Math.round(view.scale * 1) / 1 +
// //     ' | Zoom ' +
// //     view.zoom;
// //   console.log(coords);
// // }

// // view.when(function () {
// //   //*** UPDATE ***//
// //   queryFeatureLayer(view.center, 1500, 'intersects');
// //   // queryFeatureLayerView(view.center, 1500, 'intersects');
// // });

// //"Country_Region = 'US'"
// // view.on('click', function (evt) {
// //   queryFeatureLayer(
// //     evt.mapPoint,
// //     1500,
// //     'intersects',
// //     // "Country_Region = 'US'",
// //   );
// //   // console.log(evt.mapPoint);
// //   // showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
// // });

// // toggle ? map.add(covidLayer, 1) : map.add(normalLayer, 1);

// //set a placehorder featurelayer, potentially update later
// // var normalLayer = new FeatureLayer({
// //   url:
// //     'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/Joshua_Tree_Climbs/FeatureServer',
// // });
// // add a graphic layer
// // var graphicsLayer = new GraphicsLayer();
// // map.add(graphicsLayer);

// // function addGraphics(result) {
// //   // graphicsLayer.removeAll();
// //   result.features.forEach(function (feature) {
// //     var g = new Graphic({
// //       geometry: feature.geometry,
// //       attributes: feature.attributes,
// //       symbol: {
// //         type: 'simple-marker',
// //         color: [0, 0, 0],
// //         outline: {
// //           width: 2,
// //           color: [0, 255, 255],
// //         },
// //         size: '600px',
// //       },
// //       popupTemplate: {
// //         title: 'Hi There',
// //         content: 'This a trail located in.',
// //       },
// //     });
// //     graphicsLayer.add(g);
// //     console.log(g);
// //   });
// // }

// // function to query the feature layer
// // function queryFeatureLayer(
// //   point,
// //   distance,
// //   spatialRelationship,
// //   sqlExpression,
// // ) {
// //   if (!map.findLayerById(covidLayer.id)) {
// //     covidLayer.outFields = ['*'];
// //     map.add(covidLayer, 0);
// //   }
// //   var query = {
// //     geometry: point,
// //     distance: distance,
// //     spatialRelationship: spatialRelationship,
// //     outFields: ['*'],
// //     returnGeometry: true,
// //     where: sqlExpression,
// //   };
