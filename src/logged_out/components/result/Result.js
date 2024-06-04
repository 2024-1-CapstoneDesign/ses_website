import React from "react";
import withStyles from "@mui/styles/withStyles";
import {Switch, useLocation} from "react-router-dom";
import formatDateTime from "../home/formatDateTime";
import {Box, Grid} from "@mui/material";
import SoundListCard from "../soundList/SoundListCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropsRoute from "../../../shared/components/PropsRoute";
import SoundListPost from "../soundList/SoundListPost";

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

function Result(props) {
  const {classes, theme} = props;
  const gridRows = [];
  const isWidthUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation();
  const data = location.state?.data;

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
  console.log("res")
  console.dir(resSoundList);
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
  console.log("posts")
  console.dir(soundListPosts)
  let index = 0;
  soundListPosts.forEach((soundListPost) => {
    gridRows.push(
      <Grid key={soundListPost.soundId} item xs={12}>
        <Box mb={3} sx={{border: "1px red solid"}}>
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
  });

  return (
    <div>
      <h1>Result Page</h1>
      <Switch>
        {soundListPosts.map((post) => (
          <PropsRoute
            path={post.url}
            component={SoundListPost}
            title={post.soundName}
            key={post.soundName}
            src={post.soundURL}
            date={post.soundCreateAt}
            tagList={post.soundTagList}
            type={post.soundType}
            length={post.soundLength}
            sampleRate={post.soundSampleRate}
            bitDepth={post.soundBitDepth}
            channels={post.soundChannels}
            fileSize={post.soundFileSize}
            content={post.soundDescription}
            id={post.soundId}
          />
        ))}
      </Switch>
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
  );


}

export default withStyles(styles, { withTheme: true })(Result);
