import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {Box, Typography} from "@mui/material";

import withStyles from "@mui/styles/withStyles";
import WaveSurferComponent from "./WaveSurferComponent";

const styles = (theme) => ({
  soundCardContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "2px solid blue",
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
});

function SoundCard(props) {
  const { classes, soundName, soundTagList, soundURL, soundLength } = props;
  return (
    <Box className={classes.soundCardContainer}>
      <WaveSurferComponent audioURL={soundURL} className={classes.waveSurferContainer} />
      <Typography variant="h5" paragraph>
        {soundName}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {soundLength}
      </Typography>
    </Box>
  );
}

SoundCard.propTypes = {
  classes: PropTypes.object.isRequired,
  soundName: PropTypes.string.isRequired,
  soundTagList: PropTypes.array.isRequired,
  soundURL: PropTypes.string.isRequired,
  soundLength: PropTypes.number.isRequired,
};

export default withStyles(styles, { withTheme: true })(SoundCard);
