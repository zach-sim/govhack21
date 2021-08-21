import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { csrfToken } from "@rails/ujs";
import PropTypes from "prop-types";

const link = new HttpLink({
  uri: "/graphql",
  headers: { "X-CSRF-Token": csrfToken() },
});

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link,
  cache,
});

const Apollo = ({ children }) => <ApolloProvider {...{ client, children }} />;
Apollo.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Apollo;
