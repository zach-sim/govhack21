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

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setDrawerOpen((state) => !state);
  }, [setDrawerOpen]);
  return (
    <>
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
          <Typography variant="h6">Australasia Covid Updates</Typography>
          <Typography
            variant="h6"
            style={{
              margin: "0 auto",
              borderBottom: "1px solid",
              transform: "translateX(-50%)",
            }}
          >
            Locations of Interest
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Toolbar />
        <List>
          <ListItem button selected>
            Locations of Interest
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
export default NavBar;
