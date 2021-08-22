import React, { useState, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import Helmet from "react-helmet";

const PageTitle = ({ children }) => (
  <Typography
    variant="h6"
    style={{
      textAlign: "center",
      flex: 1,
    }}
  >
    <span
      style={{
        borderBottom: "1px solid",
        borderTop: "1px solid",
        display: "inline-block",
      }}
    >
      {children}
    </span>
  </Typography>
);

const titleTemplate = "%s | Australasia Covid Updates [Govhack 2021]";
const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setDrawerOpen((state) => !state);
  }, [setDrawerOpen]);
  return (
    <>
      <Route path="/locations-of-interest">
        <Helmet {...{ titleTemplate }}>
          <title>Locations of Interest</title>
        </Helmet>
      </Route>
      <Route path="/testing-sites">
        <Helmet {...{ titleTemplate }}>
          <title>TestingSites</title>
        </Helmet>
      </Route>
      <AppBar position="static" style={{ zIndex: 1350, position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5">Australasia Covid Updates</Typography>
          <Switch>
            <Route path="/locations-of-interest">
              <PageTitle>Locations of Interest</PageTitle>
            </Route>
            <Route path="/testing-sites">
              <PageTitle>Testing Sites</PageTitle>
            </Route>
            <Route path="/">
              <Redirect to="/locations-of-interest" />
            </Route>
          </Switch>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Toolbar />
        <List>
          <ListItem
            button
            component={NavLink}
            to="/locations-of-interest"
            activeClassName="Mui-selected"
          >
            Locations of Interest
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/testing-sites"
            activeClassName="Mui-selected"
          >
            Testing Sites
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
export default NavBar;
