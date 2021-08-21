import React from "react";
import { useQuery, gql } from "@apollo/client";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker, Popup } from "react-leaflet";
import { Typography, Divider } from "@material-ui/core";
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

        venue
        site
        alertTimes
      }
    }
  `);
  console.log(data);
  const item = (data?.covidLocs || [])[0];
  return (
    <MarkerClusterGroup>
      {data?.covidLocs?.map((item) => (
        <Marker key={item.id} position={[item.latitude, item.longitude]}>
          <Popup>
            <Typography variant="subtitle2">
              {item.venue || item.site}
            </Typography>
            <Divider />
            {item.alertDetails}
            <Divider />
            {item.alertTimes}
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
};
export default CovidLocs;
