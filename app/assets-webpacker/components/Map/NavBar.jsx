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
          <Typography variant="h5">Australasia Covid Updates</Typography>
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
              Locations of Interest
            </span>
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
