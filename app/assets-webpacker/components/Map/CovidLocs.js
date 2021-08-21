import React from "react";
import { useQuery, gql } from "@apollo/client";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker, Popup } from "react-leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

const CovidLocs = () => {
  const { data } = useQuery(gql`
    query {
      covidLocs {
        id
        latitude
        longitude
        alertDetails
      }
    }
  `);
  console.log(data);
  return (
    <MarkerClusterGroup>
      {data?.covidLocs?.map((item) => (
        <Marker key={item.id} position={[item.latitude, item.longitude]}>
          <Popup>{item.alertDetails}</Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
};
export default CovidLocs;
