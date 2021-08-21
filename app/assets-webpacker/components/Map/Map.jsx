import React, { useMemo } from "react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import geoViewport from "@mapbox/geo-viewport";

/* eslint-disable import/no-webpack-loader-syntax, import/no-unresolved */
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
/* eslint-enable import/no-webpack-loader-syntax, import/no-unresolved */

const NZ_BOUNDS = [
  [-46.641235447, 166.509144322],
  [-34.4506617165, 178.517093541],
];
const AU_BOUNDS = [
  [-43.6345972634, 113.338953078],
  [-10.6681857235, 153.569469029],
];
const COMBINED_BOUNDS = [
  [NZ_BOUNDS[0][0], AU_BOUNDS[0][1]],
  [AU_BOUNDS[1][0], NZ_BOUNDS[1][1]],
];

const computeViewport = () => {
  return geoViewport.viewport(
    [
      COMBINED_BOUNDS[0][1],
      COMBINED_BOUNDS[0][0],
      COMBINED_BOUNDS[1][1],
      COMBINED_BOUNDS[1][0],
    ],
    [window.innerWidth, window.innerHeight]
  );
};

const layers = [];

const Map = () => {
  const INITIAL_VIEW_STATE = useMemo(() => {
    const {
      center: [lng, lat],
      zoom,
    } = computeViewport();
    return {
      pitch: 0,
      bearing: 0,
      longitude: lng,
      latitude: lat,
      zoom: zoom - 0.5,
    };
  }, []);
  return (
    <>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        width="100vw"
        height="calc(100vh - 1px)"
      >
        <StaticMap
          mapboxApiAccessToken={`pk.eyJ1Ijoic2lsZW5zIiwiYSI6ImNrMDgzZW5kbjA1bGszbWx0b3o0azk1c3AifQ.kVDvhtKEcpo8JcSJ0LB-XQ`}
        />
      </DeckGL>
    </>
  );
};

export default Map;
