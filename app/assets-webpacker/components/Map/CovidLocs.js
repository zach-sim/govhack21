import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker, Popup } from "react-leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

const CovidLocs = () => {
  const { data, fetchMore } = useQuery(
    gql`
      query ($after: String) {
        covidLocs(after: $after) {
          pageInfo {
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              latitude
              longitude
              alertDetails
            }
          }
        }
      }
    `,
    {
      variables: {
        after: null,
      },
    }
  );
  console.log(data);
  useEffect(() => {
    if (!data) return;
    if (data.covidLocs.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: data.covidLocs.pageInfo.endCursor,
        },
      });
    }
  }, [data, fetchMore]);
  return (
    <MarkerClusterGroup>
      {data?.covidLocs?.edges?.map(({ node }) => (
        <Marker key={node.id} position={[node.latitude, node.longitude]}>
          <Popup>{node.alertDetails}</Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
};
export default CovidLocs;
