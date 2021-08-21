// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs";
import ReactOnRails from "react-on-rails";
import loadable from "@loadable/component";
import "../application.scss";

Rails.start();

const HelloWorld = loadable(() =>
  import(/* webpackChunkName: 'HelloWorld' */ "../components/HelloWorld")
);
const Map = loadable(() =>
  import(/* webpackChunkName: 'Map' */ "../components/Map/Map")
);
// This is how react_on_rails can see the components.
ReactOnRails.register({
  HelloWorld,
  Map,
});
