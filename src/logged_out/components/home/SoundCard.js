import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

import withStyles from "@mui/styles/withStyles";
import WaveSurferComponent from "./WaveSurferComponent";

const styles = (theme) => ({

});

function SoundCard(props) {
  const { classes, soundName, soundTagList, soundURL, soundLength } = props;
  return (
    <Fragment>
      <WaveSurferComponent audioURL={soundURL} />
      <Typography variant="h5" paragraph>
        {soundName}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {soundLength}
      </Typography>
    </Fragment>
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
