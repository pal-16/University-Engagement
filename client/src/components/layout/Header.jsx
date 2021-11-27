import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SchoolRoundedIcon from "@material-ui/icons/SchoolRounded";
import MoreIcon from "@material-ui/icons/MoreVert";
import Dropdown from "../common/Dropdown";
import "../common/Dropdownstyles.css";
import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem
} from "@material-ui/core";
import { useAuthDispatch, useAuthState } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  button: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  navButton: {
    marginRight: "15px"
  }
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const { isAuthenticated, userType } = useAuthState();
  const dispatch = useAuthDispatch();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigationHandler = (route) => {
    handleMobileMenuClose();
    history.push(route);
  };

  const dropdownHandler = (route) => {
    console.log(route);
    if (route == "Projects Feed") {
      navigationHandler(`/${userType}/projects/displayAll`)
    } else if (route == "View my projects") {
      navigationHandler(`/${userType}/projects/displayUserProjects`)
    } else if (route == "Upload project") {
      navigationHandler(`/${userType}/projects/new`)
    } else if (route == "Achievements Wall") {
      navigationHandler(`/${userType}/applications/displayAll`)
    } else if (route == "Submit an achievement") {
      navigationHandler(`/${userType}/applications/new`)
    } else if (route == "View my acheivements") {
      navigationHandler(`/${userType}/applications/displayAll`)
    } else if (route == "Create a post") {
      navigationHandler(`/${userType}/crowdfundings/new`)
    } else if (route == "Crowdfunding Feed") {
      navigationHandler(`/${userType}/crowdfundings/displayAll`)
    } else if (route == "View my posts") {
      navigationHandler(`/${userType}/crowdfundings/displayUserPosts`)
    } else if (route == "Profile") {
      navigationHandler(`/${userType}/profile`)
    } else {
      handleLogout();
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    history.replace("/");
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isAuthenticated ? (
        <div>
          <MenuItem
            onClick={() => navigationHandler(`/${userType}/profile`)}
          >
            <p>Profile</p>
          </MenuItem>
          <MenuItem
            onClick={() => navigationHandler(`/${userType}/applications`)}
          >
            <p>Applications</p>
          </MenuItem>

          <MenuItem onClick={handleLogout}>
            <p>Logout</p>
          </MenuItem>

        </div>
      ) : (
        <div>
          <MenuItem onClick={() => navigationHandler("/student/login")}>
            <p>Student Section</p>
          </MenuItem>
          <MenuItem onClick={() => navigationHandler("/faculty/login")}>
            <p>Faculty Section</p>
          </MenuItem>
        </div>
      )}
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>

          {isAuthenticated ? (

            <div>
              {userType == "student" ?
                <Dropdown
                  placeholder="Crowdfunding"
                  value={"Crowdfunding"}
                  onChange={(val) => dropdownHandler(val)}
                  options={["Create a post", "Crowdfunding Feed", "View my posts"]}
                /> : <p></p>}
              {userType == "student" ?
                <Dropdown
                  placeholder="Projects"
                  value={"Projects"}
                  onChange={(val) => dropdownHandler(val)}
                  options={["Upload project", "Projects Feed", "View my projects"]}
                /> : ""}
              {userType == "student" ?
                <Dropdown

                  placeholder="Acheivements"
                  value={"Achievements"}
                  onChange={(val) => dropdownHandler(val)}
                  options={["Submit an achievement", "View my acheivements", "Achievements Wall"]}
                /> : ""}
              {userType == "faculty" ?
                <Button
                  onClick={() => navigationHandler("/faculty/applications")}
                  color="inherit"
                  disableRipple
                  disableFocusRipple
                  className={classes.button} style={{ paddingBottom: "15px" }}
                >
                  <Typography variant="body1" noWrap>
                    Applications
                  </Typography>
                </Button> : ""}
              {userType == "student" ?
                <Dropdown
                  className={`${classes.navButton} ${classes.button}`}
                  placeholder="Profile"
                  value={"Profile"}
                  onClick={() => navigationHandler(`/${userType}/profile`)}
                /> : ""}
              <Button
                onClick={handleLogout}
                color="inherit"
                className={`${classes.navButton} ${classes.button}`}
                disableRipple
                disableFocusRipple >
                <Typography variant="body1" noWrap style={{ paddingBottom: "8px" }} >
                  Logout
                </Typography>
              </Button>

            </div>
          ) : (
            <div>
              <Button
                onClick={() => navigationHandler("/student/login")}
                color="inherit"
                className={`${classes.navButton} ${classes.button}`}
                disableRipple
                disableFocusRipple
              >
                <Typography variant="body1" noWrap>
                  Student
                </Typography>
              </Button>
              <Button
                onClick={() => navigationHandler("/faculty/login")}
                color="inherit"
                disableRipple
                disableFocusRipple
                className={classes.button}
              >
                <Typography variant="body1" noWrap>
                  Faculty
                </Typography>
              </Button>
            </div>
          )}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            <Button
              color="inherit"
              disableRipple
              disableFocusRipple
              className={classes.button}

              onClick={() => navigationHandler("/")}
            >
              <SchoolRoundedIcon />
              <Typography variant="h6" noWrap style={{ color: "white", marginLeft: "10px" }}>
                Microsoft Engage
              </Typography>
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div >
  );
};

export default Header;
