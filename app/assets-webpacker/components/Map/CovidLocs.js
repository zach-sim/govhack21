import React from "react";
import { useQuery, gql } from "@apollo/client";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker, Popup } from "react-leaflet";
import { Typography, Divider } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

const CovidLocPopup = ({ id }) => {
  const { data, loading } = useQuery(
    gql`
      query ($id: ID!) {
        covidLoc(id: $id) {
          id
          venue
          site
          alertDetails
          alertTimes
        }
      }
    `,
    { variables: { id } }
  );
  return (
    <>
      <Typography variant="subtitle2">
        {loading ? (
          <Skeleton />
        ) : (
          data.covidLoc.venue || data.covidLoc.site || "Unknown"
        )}
      </Typography>
      <Divider />
      {loading ? (
        <Skeleton variant="rect" height="2em" />
      ) : (
        data.covidLoc.alertDetails
      )}
      <Divider />
      {loading ? <Skeleton /> : data.covidLoc.alertTimes}
    </>
  );
};
const CovidLocs = () => {
  const { data } = useQuery(gql`
    query {
      covidLocs {
        id
        latitude
        longitude
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
            <div style={{ width: 300 }}>
              <CovidLocPopup id={item.id} />
            </div>
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
};
export default CovidLocs;
