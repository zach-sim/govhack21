import React, { useEffect } from "react";
import { CachedTileLayer } from "@yaga/leaflet-cached-tile-layer";
import { useLeafletContext } from "@react-leaflet/core";

const TileLayer = ({ onLoad }) => {
  const context = useLeafletContext();
  useEffect(() => {
    const container = context.layerContainer || context.map;
    const layer = new CachedTileLayer(
      "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg",
      {
        maxZoom: 18,
        attribution:
          '<span id="toner-attr">Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.</span>',
      }
    );
    layer.on("load", onLoad);
    container.addLayer(layer);

    return () => {
      container.removeLayer(layer);
    };
  }, [context]);
  return null;
};
export default TileLayer;
