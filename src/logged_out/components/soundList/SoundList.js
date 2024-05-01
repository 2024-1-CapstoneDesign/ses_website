import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Box } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import SoundListCard from "./SoundListCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import MySideBar from "../home/MySideBar";
import axios from "axios";
import {useQuery} from "react-query";
import data from "../../../logged_in/dummy_data/persons";

const styles = (theme) => ({
  blogContentWrapper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    maxWidth: 1280,
    width: "100%",
  },
  wrapper: {
    minHeight: "60vh",
  },
  noDecoration: {
    textDecoration: "none !important",
  },
});

function getVerticalSoundListPosts(isWidthUpSm, isWidthUpMd, soundListPosts, soundLists) {
  const gridRows = [[], [], []];
  let rows;
  let xs;
  if (isWidthUpMd) {
    rows = 3;
    xs = 4;
  } else if (isWidthUpSm) {
    rows = 2;
    xs = 6;
  } else {
    rows = 1;
    xs = 12;
  }
  soundListPosts.forEach((soundListPost, index) => {
    gridRows[index % rows].push(
      <Grid key={soundListPost.id} item xs={12}>
        <Box mb={3}>
          <SoundListCard
            src={soundListPost.src}
            title={soundListPost.title}
            snippet={soundListPost.snippet}
            date={soundListPost.date}
            url={soundListPost.url}
            audioURL={soundLists[index % soundLists.length].soundURL}
          />
        </Box>
      </Grid>
    );
  });
  return gridRows.map((element, index) => (
    <Grid key={index} item xs={xs}>
      {element}
    </Grid>
  ));
}

const fetchSoundList = async (getURLPost) => {
  const url = "https://soundeffect-search.p-e.kr/api/v1/soundeffect"
  try {
    const axiosRes = await axios.get(url);
    const resData = axiosRes.data; //fetchResult
    if (resData.result === "SUCCESS"){
      const resSoundList = resData.data.map(({soundEffectId, soundEffectName, soundEffectTags, soundEffectTypes}, idx) => {
        return {
          soundId: soundEffectId,
          soundName: soundEffectName,
          soundTagList: soundEffectTags,
          soundURL: soundEffectTypes[0].url,
          soundLength: soundEffectTypes[0].length,
        }
      });
      return resSoundList;
    }
    return {
      errorMessage: "Server Error",
    };
  } catch (e){
    console.error(e);
    throw e;
  }
}

function SoundList(props) {
  const { classes, soundListPosts, selectSoundList, theme } = props;

  const isWidthUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));

  const {
    isLoading,
    isError,
    data: soundLists
  } = useQuery('soundList', fetchSoundList, {
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    selectSoundList();
  }, [selectSoundList]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      className={classNames(classes.wrapper, "lg-p-top")}
    >
      <MySideBar/>
      <div className={classes.blogContentWrapper}>
        <Grid container spacing={3}>
          {!isLoading && getVerticalSoundListPosts(isWidthUpSm, isWidthUpMd, soundListPosts, soundLists)}
        </Grid>
      </div>
    </Box>
  );
}

SoundList.propTypes = {
  selectSoundList: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  soundListPosts: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(styles, { withTheme: true })(SoundList);
