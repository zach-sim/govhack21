import React from "react";
import { useQuery, gql } from "@apollo/client";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker, Popup } from "react-leaflet";
import { Typography, Divider } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import LaunchIcon from "@material-ui/icons/Launch";

const CovidTestingSitePopup = ({ id }) => {
  const { data, loading } = useQuery(
    gql`
      query ($id: ID!) {
        covidTestingSite(id: $id) {
          id
          name
          url
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
          <>
            {data.covidTestingSite.name}
            <a
              href={data.covidTestingSite.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LaunchIcon
                style={{ fontSize: "small", verticalAlign: "super" }}
              />
            </a>
          </>
        )}
      </Typography>
    </>
  );
};

const CovidTestingSites = () => {
  const { data } = useQuery(gql`
    query {
      covidTestingSites {
        id
        latitude
        longitude
      }
    }
  `);
  return (
    <MarkerClusterGroup>
      {data?.covidTestingSites?.map((item) => (
        <Marker key={item.id} position={[item.latitude, item.longitude]}>
          <Popup>
            <div style={{ width: 300 }}>
              <CovidTestingSitePopup id={item.id} />
            </div>
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
};

export default CovidTestingSites;
