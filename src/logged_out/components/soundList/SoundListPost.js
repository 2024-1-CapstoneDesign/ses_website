import React, {useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import format from "date-fns/format";
import {Box, Button, Card, Chip, Divider, Grid, Stack, Typography} from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import SoundListCard from "./SoundListCard";
import smoothScrollTop from "../../../shared/functions/smoothScrollTop";
import WaveSurferComponent from "../home/WaveSurferComponent";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import SoundDetailPaper from "./SoundDetailPaper";
import axios from "axios";

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
  img: {
    width: "100%",
    height: "auto",
  },
  card: {
    boxShadow: theme.shadows[4],
  },
  chip: {
    // backgroundColor: theme.palette.secondary.main,
    // color: "white",
    color: theme.palette.secondary.main,
    marginRight: "8px",
    marginBottom: "8px",
  },
  titleContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleButtonContainer:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  itemPaperContainer:{
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
  },
  textTitle:{
    color: theme.palette.text.primary,
  },
  textDefault:{
    color: theme.palette.text.secondary,
  },
});

function SoundListPost(props) {
  const { classes, date, title, src, content, tagList, fileExtension, id } = props;
  const [relativeSoundEffects, setRelativeSoundEffects] = useState([])
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    document.title = `AuLo - ${title}`;
    smoothScrollTop();
  }, [title]);

  const fetchRelativeSoundList = useCallback(() => {
    async function fetchData() {
      const url = `https://soundeffect-search.p-e.kr/api/v1/soundeffect/${id}/relative`
      try {
        const axiosRes = await axios.get(url);
        const resData = axiosRes.data; //fetchResult
        if (resData.result === "SUCCESS"){
          return resData.data.map((soundEffect) => {
            return {
              soundId: soundEffect.soundEffectId,
              soundName: soundEffect.soundEffectName,
              soundTagList: soundEffect.soundEffectTags,
              soundURL: soundEffect.soundEffectTypes[0].url,
              soundType: soundEffect.soundEffectTypes[0].soundEffectTypeName,
              soundLength: soundEffect.soundEffectTypes[0].length,
              soundDescription: soundEffect.description,
              soundCreateBy: soundEffect.createBy,
              // soundCreateAt: soundEffect.createAt,
              soundSnippet: "this is sound",
              soundCreateAt: 1576281600,
            }
          });
        }
        return {
          errorMessage: "Server Error",
        };
      } catch (e){
        console.error(e);
        throw e;
      }
    }
    fetchData().then(data => {
      const soundListPosts = data.map((e) => {
        let title = e.soundName;
        title = title.toLowerCase();
        /* Remove unwanted characters, only accept alphanumeric and space */
        title = title.replace(/[^A-Za-z0-9 ]/g, "");
        /* Replace multi spaces with a single space */
        title = title.replace(/\s{2,}/g, " ");
        /* Replace space with a '-' symbol */
        title = title.replace(/\s/g, "-");
        e.url = `/soundList/card/${title}`;
        e.params = `?id=${e.soundId}`;
        return e;
      });
      setRelativeSoundEffects(soundListPosts)
    })
  }, [id]);

  useEffect(fetchRelativeSoundList, [fetchRelativeSoundList]);

  const handleDownload = () => {
    fetch(src, { method: 'GET' })
      .then(res => {
        return res.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}.${fileExtension}`;
        document.body.appendChild(a);
        a.click();
        setTimeout(_ => {
          window.URL.revokeObjectURL(url);
        }, 60000);
        a.remove();
      })
      .catch(err => {
        console.error('err: ', err);
      });
  };

  // 시간을 hh:mm:ss 형식으로 변환하는 함수
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    // 시, 분, 초를 두 자리수로 표시하고 앞에 0을 붙임
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <Box
      className={classNames("lg-p-top", classes.wrapper)}
      display="flex"
      justifyContent="center"
    >
      <div className={classes.blogContentWrapper}>
        <Grid container spacing={5}>
          <Grid item md={9}>
            <Card className={classes.card}>
              <Box sx={{border: '2px solid black'}}>
                <WaveSurferComponent
                  audioURL={src}
                  setCurrentTime={setCurrentTime}
                  setDuration={setDuration}
                />
              </Box>
              <Box pt={1} pr={3} pl={3} className={classes.titleContainer}>
                <Typography>
                  {formatTime(currentTime)}
                </Typography>
                <Typography>
                  {formatTime(duration)}
                </Typography>
              </Box>
              <Box pt={3} pr={3} pl={3} pb={2} className={classes.titleContainer}>
                <Box>
                  <Typography variant="h4">
                    <b>{title}</b>
                  </Typography>
                  <Box sx={{display: 'flex'}}>
                    <Typography variant="body1" color="textSecondary" sx={{padding: '0px 5px'}}>
                      Downloads 133,333
                    </Typography>
                    <Typography variant="body1">
                      |
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{padding: '0px 5px'}}>
                      {format(new Date(date * 1000), "PPP", {
                        awareOfUnicodeTokens: true,
                      })}
                    </Typography>
                  </Box>
                  <Box sx={{margin: '5px 0'}}>
                    {tagList && tagList.map(({tagId, tagName}) => {
                      return (
                        <Chip
                          label={tagName}
                          variant="outlined"
                          size="small"
                          className={classes.chip}
                          key={tagId}
                        />);
                    })}
                  </Box>
                </Box>
                <Box className={classes.titleButtonContainer}>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudDownloadIcon />}
                    onClick={handleDownload}
                  >
                    Download
                  </Button>
                </Box>
              </Box>
              <Box p={3}>
                {content}
                <Divider />
                <Box pt={2} sx={{display:'flex', justifyContent: 'center'}}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    sx={{width: '100%', height: '100%'}}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <SoundDetailPaper title="Type" value="wave" />
                    <SoundDetailPaper title="Duration" value="00:30:00" />
                    <SoundDetailPaper title="File Size" value="18.42MB" />
                    <SoundDetailPaper title="Sample Rate" value="48000.00HZ" />
                    <SoundDetailPaper title="Bit depth" value="24bit" />
                    <SoundDetailPaper title="Channels" value="Stereo" />
                  </Stack>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item md={3}>
            <Typography variant="h6" paragraph>
              Relative Sounds
            </Typography>
            {relativeSoundEffects && relativeSoundEffects.map((blogPost) => (
              <Box key={blogPost.soundId} mb={3}>
                <SoundListCard
                  title={blogPost.soundName}
                  snippet={blogPost.soundSnippet}
                  date={blogPost.soundCreateAt}
                  src={blogPost.soundURL}
                  url={`${blogPost.url}${blogPost.params}`}
                />
              </Box>
            ))}
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}

SoundListPost.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  otherArticles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles, { withTheme: true })(SoundListPost);
