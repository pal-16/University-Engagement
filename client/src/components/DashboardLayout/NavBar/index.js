import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
  useTheme
} from "@material-ui/core";
import {
  User,
  GitHub,
  Linkedin,
  Twitter
} from "react-feather";
import NavItem from "./NavItem";
import { useAuthState } from "../../../context/AuthContext";
const items = [
  {
    icon: GitHub,
    title: "GitHub"
  },
  {
    icon: Linkedin,
    title: "LinkedIn"
  },
  {
    icon: Twitter,
    title: "Twitter"
  }
];


const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
    backgroundColor: "white"
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    zIndex: 1,
    height: 500,
    backgroundColor: "white"
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
    backgroundColor: theme.palette.primary.main,

  }
}));

const NavBar = ({ onMobileClose, openMobile, setContents }) => {
  const classes = useStyles();
  const { user } = useAuthState();
const theme=useTheme();
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar className={classes.avatar} src={User}  />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          Student
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item, idx) => (
            <NavItem
              key={item.title}
              title={item.title}
              icon={item.icon}
              index={idx}
              setContents={setContents}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
  setContents: PropTypes.func
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
