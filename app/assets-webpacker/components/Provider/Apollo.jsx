import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { csrfToken } from "@rails/ujs";
import PropTypes from "prop-types";
import { createNetworkStatusNotifier } from "react-apollo-network-status";
import { relayStylePagination } from "@apollo/client/utilities";

const { link, useApolloNetworkStatus } = createNetworkStatusNotifier();

export const GlobalLoadingIndicator = ({ children }) => {
  const status = useApolloNetworkStatus();

  if (status.numPendingQueries > 0) {
    return children;
  } else {
    return null;
  }
};

const httpLink = new HttpLink({
  uri: "/graphql",
  headers: { "X-CSRF-Token": csrfToken() },
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        covidLocs: relayStylePagination(),
      },
    },
  },
});

export const client = new ApolloClient({
  link: link.concat(httpLink),
  cache,
});

const Apollo = ({ children }) => <ApolloProvider {...{ client, children }} />;
Apollo.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Apollo;
