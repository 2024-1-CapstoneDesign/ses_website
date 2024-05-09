import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import format from "date-fns/format";
import {Grid, Typography, Card, Box, Chip, Button} from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import SoundListCard from "./SoundListCard";
import ShareButton from "../../../shared/components/ShareButton";
import smoothScrollTop from "../../../shared/functions/smoothScrollTop";
import WaveSurferComponent from "../home/WaveSurferComponent";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

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
});

function SoundListPost(props) {
  const { classes, date, title, src, content, tagList, fileExtension, otherArticles } = props;

  useEffect(() => {
    document.title = `AuLo - ${title}`;
    smoothScrollTop();
  }, [title]);

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

  const sliceOtherArticles = otherArticles.slice(0, 5) // up to 5 element

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
                <WaveSurferComponent audioURL={src}/>
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
                <Box pt={2}>
                  <Grid spacing={1} container>
                    {["Facebook", "Twitter", "Reddit", "Tumblr"].map(
                      (type, index) => (
                        <Grid item key={index}>
                          <ShareButton
                            type={type}
                            title="React SaaS Template"
                            description="I found an awesome template for an webapp using React!"
                            disableElevation
                            variant="contained"
                            className="text-white"
                            classes={{
                              label: "text-white",
                            }}
                          />
                        </Grid>
                      )
                    )}
                  </Grid>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item md={3}>
            <Typography variant="h6" paragraph>
              Relative Sounds
            </Typography>
            {sliceOtherArticles.slice(0, 3).map((blogPost) => (
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
