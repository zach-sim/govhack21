import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const NavBar = () => (
  <AppBar position="static">
    <Toolbar>
      {/* TODO: show icon button + expandable navbar after adding other views */}
      {/* <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton> */}
      <Typography variant="h6">Australasia Covid Updates</Typography>
      <Typography
        variant="h6"
        style={{
          margin: "0 auto",
          borderBottom: "1px solid",
        }}
      >
        Locations of Interest
      </Typography>
    </Toolbar>
  </AppBar>
);
export default NavBar;
