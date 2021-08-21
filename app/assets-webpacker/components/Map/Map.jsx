import React from "react";
import { MapContainer, TileLayer, Rectangle, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon, Marker as LMarker } from "leaflet";
import imgIcon from "leaflet/dist/images/marker-icon.png";
import imgIconShadow from "leaflet/dist/images/marker-shadow.png";
import { withProvider } from "../Provider/Provider";
import CovidLocs from "./CovidLocs";
import NavBar from "./NavBar";
import { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";

let DefaultIcon = icon({
  iconUrl: imgIcon,
  shadowUrl: imgIconShadow,
});
LMarker.prototype.options.icon = DefaultIcon;

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

const Map = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LinearProgress style={{ marginBottom: -4, zIndex: 1500 }} />}
      <NavBar />
      <MapContainer
        bounds={COMBINED_BOUNDS}
        zoomSnap={0.5}
        style={{ height: "calc(100vh - 64px)" }}
        preferCanvas
      >
        <TileLayer
          eventHandlers={{
            load: () => setLoaded(true),
          }}
          attribution='<span id="toner-attr">Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.</span>'
          url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg"
          maxZoom={18}
        />
        <Switch>
          <Route path="/locations-of-interest">
            {loaded && (
              <>
                <CovidLocs />
              </>
            )}
          </Route>
          <Route path="/" />
        </Switch>
        {/* Below bounds check is for debug purposes */}
        {false && (
          <>
            <Rectangle bounds={NZ_BOUNDS} />
            <Rectangle bounds={AU_BOUNDS} />
            <Marker position={COMBINED_BOUNDS[0]} />
            <Marker position={COMBINED_BOUNDS[1]} />
          </>
        )}
      </MapContainer>
    </>
  );
};

export default withProvider(Map);
