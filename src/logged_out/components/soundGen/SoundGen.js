import React, {useEffect} from "react";
import withStyles from "@mui/styles/withStyles";
import {Box, IconButton, Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import classNames from "classnames";

const styles = (theme) => ({
  blogContentWrapper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
  },
  wrapper: {
    minHeight: "60vh",
  },
  titleContainer: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  searchBorder: {
    border: "1px solid rgb(229 231 235)",
    display: "flex",
    justifyContent: "space-evenly",
  }
});

function SoundGen(props) {
  const {classes, theme, selectSoundGen} = props;

  useEffect(() => {
    selectSoundGen();
  }, [selectSoundGen]);
  
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      className={classNames(classes.wrapper, "lg-p-top")}
    >
      <div className={classes.titleContainer}>
        <Typography
          variant="h2"
          component="h2"
          fontWeight="400"
        >
          SoundEffect Results
        </Typography>
        <Box className={classes.searchBorder}>
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search" disabled>
            <SearchIcon />
          </IconButton>
        </Box>
      </div>
    </Box>
  );


}

export default withStyles(styles, { withTheme: true })(SoundGen);
