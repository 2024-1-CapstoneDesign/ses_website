import React, {useEffect} from "react";
import { withStyles } from "@mui/styles";
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Grid, Box, Button
} from "@mui/material";
import classNames from "classnames";
import {Logout} from "@mui/icons-material";
import {useHistory} from "react-router-dom";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(6),
    maxWidth: 400,
  },
  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  favoriteSoundContainer: {
    width: "100%",
    height: "50%",
  },
});

function Profile(props) {
  const { classes, selectProfile} = props;
  const userObj = JSON.parse(localStorage.getItem("userinfo"));
  const history = useHistory();
  console.dir(userObj);

  const logoutHandler = () => {
    localStorage.removeItem("userinfo");
    history.push("/");
    window.location.reload();
  }

  useEffect(() => {
    selectProfile();
  }, [selectProfile]);

  return (
    <Container className={classNames(classes.container, "lg-p-top")}>
      <Paper className={classes.paper}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item>
            <Avatar
              alt="User Avatar"
              className={classes.avatar}
              src={userObj.picture}
            />
          </Grid>
          <Grid item>
            <Typography variant="h4" gutterBottom>
              {userObj.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {userObj.email}
            </Typography>
          </Grid>
        </Grid>
        <Box className={classes.favoriteSoundContainer}>
          <Typography variant="h6" component="div">
            Favorite Sound
          </Typography>
        </Box>
        <Box>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<Logout />}
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default withStyles(styles)(Profile);
