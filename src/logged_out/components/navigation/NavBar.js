import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {AppBar, Toolbar, Typography, Button, Hidden, IconButton, Box, Stack} from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import BookIcon from "@mui/icons-material/Book";
import NavigationDrawer from "../../../shared/components/NavigationDrawer";

const styles = theme => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  menuButtonText: {
    fontFamily: "'Orbitron', cursive",
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
  },
  brandText: {
    fontFamily: "'Orbitron', cursive",
    fontWeight: 700
  },
  noDecoration: {
    textDecoration: "none !important"
  },
  logoWrapper:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '10wv'
  }
});

function NavBar(props) {
  const {
    classes, //위에 있는 style을 추가로 default 내보낼때 사용함
    openRegisterDialog,
    openLoginDialog,
    handleMobileDrawerOpen,
    handleMobileDrawerClose,
    mobileDrawerOpen,
    selectedTab
  } = props;
  const menuItems = [
    {
      link: "/",
      name: "Home",
      icon: <HomeIcon className="text-white" />,
      src: `${process.env.PUBLIC_URL}/images/logged_out/home.png`
    },
    {
      link: "/soundList",
      name: "soundList",
      icon: <BookIcon className="text-white" />,
      src: `${process.env.PUBLIC_URL}/images/logged_out/soundlist.png`
    },
    {
      name: "Register",
      onClick: openRegisterDialog,
      icon: <HowToRegIcon className="text-white" />,
      src: `${process.env.PUBLIC_URL}/images/logged_out/register.png`
    },
    {
      name: "Login",
      onClick: openLoginDialog,
      icon: <LockOpenIcon className="text-white" />,
      src: `${process.env.PUBLIC_URL}/images/logged_out/door.png`
    }
  ];
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {/* 2 * 2 pixel size*/}
          <div className={classes.logoWrapper}>
            <img src={`${process.env.PUBLIC_URL}/images/logged_out/logo4.png`} alt="logo"/>
            <div>
              <Typography
                variant="h4"
                className={classes.brandText}
                display="inline"
                color="primary"
              >
                Au
              </Typography>
              <Typography
                variant="h4"
                className={classes.brandText}
                display="inline"
                color="secondary"
              >
                Lo
              </Typography>
            </div>
          </div>
          <div>
            <Hidden mdUp>
            <IconButton
                className={classes.menuButton}
                onClick={handleMobileDrawerOpen}
                aria-label="Open Navigation"
                size="large">
                <MenuIcon color="primary" />
              </IconButton>
            </Hidden>
            <Hidden mdDown>
              {menuItems.map(element => {
                if (element.link) {
                  return (
                    <Link
                      key={element.name}
                      to={element.link}
                      className={classes.noDecoration}
                      onClick={handleMobileDrawerClose}
                    >
                      <Button
                        color="secondary"
                        size="large"
                        classes={{ text: classes.menuButtonText }}
                      >
                        <Stack direction="column"
                               justifyContent="center"
                               alignItems="center"
                               sx={{height: "100%"}}
                        >
                          <img src={element.src} alt="logo"/>
                          {element.name}
                        </Stack>
                      </Button>
                    </Link>
                  );
                }
                return (
                  <Button
                    color="secondary"
                    size="large"
                    onClick={element.onClick}
                    classes={{text: classes.menuButtonText}}
                    key={element.name}
                  >
                    <Stack direction="column"
                            justifyContent="center"
                            alignItems="center"
                           sx={{height: "100%"}}
                    >
                      <img src={element.src} alt="logo"/>
                      {element.name}
                    </Stack>
                  </Button>
                );
              })}
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
      <NavigationDrawer
        menuItems={menuItems}
        anchor="right"
        open={mobileDrawerOpen}
        selectedItem={selectedTab}
        onClose={handleMobileDrawerClose}
      />
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleMobileDrawerOpen: PropTypes.func,
  handleMobileDrawerClose: PropTypes.func,
  mobileDrawerOpen: PropTypes.bool,
  selectedTab: PropTypes.string,
  openRegisterDialog: PropTypes.func.isRequired,
  openLoginDialog: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(memo(NavBar));
