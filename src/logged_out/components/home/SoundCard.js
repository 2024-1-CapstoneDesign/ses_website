import React from "react";
import PropTypes from "prop-types";
import {Box, Chip, Typography} from "@mui/material";

import withStyles from "@mui/styles/withStyles";
import WaveSurferComponent from "./WaveSurferComponent";

const styles = (theme) => ({
  soundCardContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
  chipContainer: {
    display: "flex",
    flexWrap: "wrap", // 요소가 넘치면 다음 줄로 넘어가도록 설정
  },
  chipGroup: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing(1), // 요소 사이의 간격 설정
  },
  chip: {
    margin: theme.spacing(0.5),
  }
});

function convertSecondToMMSS(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const paddedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${minutes}:${paddedSeconds}`;
}

function SoundCard(props) {
  const { classes, soundName, soundTagList, soundURL, soundLength } = props;
  console.dir(soundTagList)
  return (
    <Box className={classes.soundCardContainer}>
      <WaveSurferComponent audioURL={soundURL} className={classes.waveSurferContainer} />
      <Typography variant="h5" paragraph>
        {soundName}
      </Typography>
      <Box className={classes.chipGroup}>
        <Box className={classes.chipContainer}>
          {soundTagList.map(({ tagId, tagName }) => (
            <Chip key={tagId} label={tagName} variant="outlined" className={classes.chip} />
          ))}
        </Box>
        <Typography variant="body1" color="textSecondary">
          {convertSecondToMMSS(soundLength)}
        </Typography>
      </Box>
    </Box>
  );
}

SoundCard.propTypes = {
  classes: PropTypes.object.isRequired,
  soundName: PropTypes.string.isRequired,
  soundURL: PropTypes.string.isRequired,
  soundLength: PropTypes.number.isRequired,
};

export default withStyles(styles, { withTheme: true })(SoundCard);
