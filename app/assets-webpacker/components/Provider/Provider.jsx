/* eslint-disable react/display-name */
import React from "react";
import PropTypes from "prop-types";
import ApolloProvider from "./Apollo";

const providers = {
  apollo: ({ children }) => <ApolloProvider {...{ children }} />,
};

const Provider = ({ children, ...opts }) => {
  // filter provider if opts[k] is false
  const enabledProviders = Object.entries(providers)
    .map(([k, v]) => opts[k] && v)
    .filter((v) => v);
  // eslint-disable-next-line react/no-children-prop
  return enabledProviders
    .reverse()
    .reduce((child, Component) => <Component children={child} />, children);
};
Provider.propTypes = {
  children: PropTypes.node.isRequired,
  ...Object.fromEntries(Object.keys(providers).map((k) => [k, PropTypes.bool])),
};
Provider.defaultProps = Object.fromEntries(
  Object.keys(providers).map((k) => [k, true])
);
export default Provider;

export const withProvider = (Component, props) => () =>
  (
    <Provider {...props}>
      <Component />
    </Provider>
  );
