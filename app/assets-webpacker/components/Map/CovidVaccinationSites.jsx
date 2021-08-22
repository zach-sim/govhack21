import React from "react";
import { useQuery, gql } from "@apollo/client";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker, Popup } from "react-leaflet";
import { Typography, Divider } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import LaunchIcon from "@material-ui/icons/Launch";

const CovidVaccinationSitePopup = ({ id }) => {
  const { data, loading } = useQuery(
    gql`
      query ($id: ID!) {
        covidVaccinationSite(id: $id) {
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
        {loading ? <Skeleton /> : data.covidVaccinationSite.name}
        {data?.covidVaccinationSite?.url && (
          <a
            href={data.covidVaccinationSite.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LaunchIcon style={{ fontSize: "small", verticalAlign: "super" }} />
          </a>
        )}
      </Typography>
    </>
  );
};

const CovidVaccinationSites = () => {
  const { data } = useQuery(gql`
    query {
      covidVaccinationSites {
        id
        latitude
        longitude
      }
    }
  `);
  return (
    <MarkerClusterGroup>
      {data?.covidVaccinationSites?.map((item) => (
        <Marker key={item.id} position={[item.latitude, item.longitude]}>
          <Popup>
            <div style={{ width: 300 }}>
              <CovidVaccinationSitePopup id={item.id} />
            </div>
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
};

export default CovidVaccinationSites;
