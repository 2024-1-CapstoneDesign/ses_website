import React, {useEffect} from "react";
import withStyles from "@mui/styles/withStyles";
import {useLocation} from "react-router-dom";
import formatDateTime from "../home/formatDateTime";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import SoundListCard from "../soundList/SoundListCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

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

function Result(props) {
  const {classes, theme, setSoundListPosts} = props;
  const gridRows = [];
  const isWidthUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation();
  const data = location.state?.data;
  const targetName = location.state?.targetName;

  let xs;
  if (isWidthUpMd) {
    xs = 4;
  } else if (isWidthUpSm) {
    xs = 6;
  } else {
    xs = 12;
  }

  const resSoundList = data.map((soundEffect) => {
    return {
      soundId: soundEffect.soundEffectId,
      soundName: soundEffect.soundEffectName,
      soundTagList: soundEffect.soundEffectTags,
      soundURL: soundEffect.soundEffectTypes[0].url,
      soundType: soundEffect.soundEffectTypes[0].soundEffectTypeName,
      soundLength: soundEffect.soundEffectTypes[0].length,
      soundSampleRate: soundEffect.soundEffectTypes[0].sampleRate,
      soundBitDepth: soundEffect.soundEffectTypes[0].bitDepth,
      soundChannels: soundEffect.soundEffectTypes[0].channels,
      soundFileSize: soundEffect.soundEffectTypes[0].fileSize,
      soundDescription: soundEffect.description,
      soundCreateBy: soundEffect.createBy,
      soundCreateAt: formatDateTime(soundEffect.createdAt),
      soundSnippet: soundEffect.summary,
    }
  });
  const soundListPosts = resSoundList.map((soundListPost) => {
    let title = soundListPost.soundName;
    title = title.toLowerCase();
    /* Remove unwanted characters, only accept alphanumeric and space */
    title = title.replace(/[^A-Za-z0-9 ]/g, "");
    /* Replace multi spaces with a single space */
    title = title.replace(/\s{2,}/g, " ");
    /* Replace space with a '-' symbol */
    title = title.replace(/\s/g, "-");
    soundListPost.url = `/soundList/card/${title}`;
    soundListPost.params = `?id=${soundListPost.soundId}`;
    return soundListPost;
  });
  soundListPosts.forEach((soundListPost) => {
    gridRows.push(
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
  });

  useEffect(() => {
    setSoundListPosts(soundListPosts);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);


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
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            value={targetName}
            disabled
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search" disabled>
            <SearchIcon />
          </IconButton>
        </Box>
      </div>
      <div className={classes.blogContentWrapper}>
        <Grid container spacing={3}>
          {gridRows &&
            gridRows.map((element, index) => (
              <Grid key={index} item xs={xs}>
                {element}
              </Grid>
            ))
          }
        </Grid>
      </div>
    </Box>
  );


}

export default withStyles(styles, { withTheme: true })(Result);
