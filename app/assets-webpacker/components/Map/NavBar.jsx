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
import { Switch, Route, Link, Redirect } from "react-router-dom";
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

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setDrawerOpen((state) => !state);
  }, [setDrawerOpen]);
  return (
    <>
      <Route path="/locations-of-interest">
        <Helmet titleTemplate="%s | Australasia Covid Updates [Govhack 2021]">
          <title>Locations of Interest</title>
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
            <Route path="/">
              <Redirect to="/locations-of-interest" />
            </Route>
          </Switch>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Toolbar />
        <List>
          {/* TODO: style active page with selected */}
          <ListItem button selected>
            Locations of Interest
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
export default NavBar;
