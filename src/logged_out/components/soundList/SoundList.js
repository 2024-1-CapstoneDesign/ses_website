import React, {useEffect} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Grid, Box, Pagination} from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import SoundListCard from "./SoundListCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import MySideBar from "../home/MySideBar";

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

function getVerticalSoundListPosts(isWidthUpSm, isWidthUpMd, soundListPosts) {
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
  let index = 0;
  soundListPosts.forEach((soundListPost) => {
    if (soundListPost.soundVisible){
      gridRows[index % rows].push(
        <Grid key={soundListPost.soundId} item xs={12}>
          <Box mb={3}>
            <SoundListCard
              title={soundListPost.soundName}
              snippet={soundListPost.soundSnippet}
              date={soundListPost.soundCreateAt}
              url={soundListPost.url}
              src={soundListPost.soundURL}
              tagList={soundListPost.soundTagList}
            />
          </Box>
        </Grid>
      );
      index++;
    }
  });
  return gridRows.map((element, index) => (
    <Grid key={index} item xs={xs}>
      {element}
    </Grid>
  ));
}

function SoundList(props) {
  const { classes, soundListPosts, setSoundListPosts,  selectSoundList, setPage, theme, page } = props;
  const handleChange = (event, value) => {
    setPage(value - 1);
  };

  const isWidthUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));

  const totalPages = soundListPosts[0]?.pageCnt

  useEffect(() => {
    selectSoundList();
  }, [selectSoundList, totalPages]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      className={classNames(classes.wrapper, "lg-p-top")}
    >
      <MySideBar
        selectSoundList={selectSoundList}
        soundListPosts={soundListPosts}
        setSoundListPosts={setSoundListPosts}
      />
      <div className={classes.blogContentWrapper}>
        <Grid container spacing={3}>
          {getVerticalSoundListPosts(isWidthUpSm, isWidthUpMd, soundListPosts)}
        </Grid>
        <Box sx={{display: 'flex', justifyContent: 'center'}} mt={3}>
          {totalPages &&
            <Pagination
              count={totalPages}
              color="primary"
              onChange={handleChange}
              page={page + 1}
            />
          }
        </Box>
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
