import React, {useCallback, useEffect, useRef, useState} from "react";
import { withStyles } from "@mui/styles";
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Grid, Box, Button, SvgIcon
} from "@mui/material";
import classNames from "classnames";
import {Logout} from "@mui/icons-material";
import {Link, useHistory} from "react-router-dom";
import SoundListCard from "../soundList/SoundListCard";
import axios from "axios";
import formatDateTime from "./formatDateTime";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cookies from "js-cookie";


const styles = (theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(6),
    width: "80vw",
  },
  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  favoriteSoundContainer: {
    marginTop: theme.spacing(5),
  },
  bottomProfileContainer: {
    height: "10%",
    width: "100%",
    marginTop: theme.spacing(5),
    display: "flex",
    justifyContent: "center"
  },
  root: {
    width: "70vw",
    margin: "0 auto",
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: theme.shape.borderRadius,
  },
  slider: {
    "& .slick-prev": {
      left: theme.spacing(-5),
      zIndex: 1,
    },
    "& .slick-next": {
      right: theme.spacing(-5),
      zIndex: 1,
    },
    "& .slick-prev:before, & .slick-next:before": {
      color: theme.palette.primary.main,
    },
  },
  slide: {
    textAlign: "center",
    padding: theme.spacing(2),
  },
  emptySoundContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "400px",
    px: 4,
    textAlign: "center",
  },
  emptySoundButton: {
    marginTop: theme.spacing(2),
    height: 36,
    px: 2,
    py: 1,
    fontSize: "0.875rem",
    fontWeight: "medium",
    backgroundColor: "#212121",
    color: "grey.50",
    boxShadow: 1,
    "&:hover": {
      backgroundColor: "#212121",
      opacity: 0.9,
    },
    "&:focusVisible": {
      outline: "none",
      ring: 1,
      ringColor: "#121212",
    },
    "&.Mui-disabled": {
      pointerEvents: "none",
      opacity: 0.5,
    },
  },
});

function Profile(props) {
  const { classes, selectProfile, setSoundListPosts} = props;
  const userObj = JSON.parse(localStorage.getItem("userinfo"));
  const access_token = Cookies.get('accessToken');
  const history = useHistory();
  const [likeSoundList, setLikeSoundList] = useState(null);
  const sliderRef = useRef(null);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: (likeSoundList && likeSoundList.length === 0 ? 1 : Math.min(likeSoundList ? likeSoundList.length : 3, 3)),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: likeSoundList && likeSoundList.length === 0 ? 1 : Math.min(likeSoundList ? likeSoundList.length : 2, 2),
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          initialSlide: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          initialSlide: 1,
        }
      }
    ]
  };


  const logoutHandler = () => {
    localStorage.removeItem("userinfo");
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    history.push("/");
    window.location.reload();
  }

  const fetchLikeSoundList = useCallback(() => {
    async function fetchLikeData() {
      const url = `https://soundeffect-search.p-e.kr/api/v1/soundeffect/like`
      try {
        const axiosRes = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          }
        });
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
              soundSampleRate: soundEffect.soundEffectTypes[0].sampleRate,
              soundBitDepth: soundEffect.soundEffectTypes[0].bitDepth,
              soundChannels: soundEffect.soundEffectTypes[0].channels,
              soundFileSize: soundEffect.soundEffectTypes[0].fileSize,
              soundDescription: soundEffect.description,
              soundCreateBy: soundEffect.createBy,
              soundCreateAt: formatDateTime(soundEffect.createdAt),
              soundSnippet: soundEffect.summary,
              soundVisible: true,
              isLiked: soundEffect.isLiked,
            }
          });
        }
        return {
          errorMessage: "Server Error",
        };
      } catch (e){
        console.error(e);
        return []
      }
    }
    fetchLikeData()
      .then(data => {
      const res = data.map((e) => {
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
      setLikeSoundList(res);
      setSoundListPosts(res);
    })
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(fetchLikeSoundList, [fetchLikeSoundList]);

  useEffect(() => {
    selectProfile();
  }, [selectProfile]);

  const HeadphonesIcon = (props) => {
    return (
      <SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </SvgIcon>
    );
  }

  return (
    <Container className={classNames(classes.container, "lg-p-top")}>
      <Paper className={classes.paper}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item>
            <Avatar
              alt="User Avatar"
              className={classes.avatar}
              src={userObj.profile}
            />
          </Grid>
          <Grid item>
            <Typography variant="h4" gutterBottom>
              {userObj.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {userObj.email}
            </Typography>
          </Grid>
        </Grid>
        <Box className={classes.favoriteSoundContainer}>
          <Typography variant="h6" component="div" sx={{display: "flex", justifyContent: "left"}}>
            Favorite Sound
          </Typography>
          <Box className={classes.root}>
            <Slider ref={sliderRef} {...settings} className={classes.slider}>
              {likeSoundList &&
                likeSoundList.length !== 0 ? likeSoundList.map((element, index) => {
                  return (
                    <SoundListCard
                      title={element.soundName}
                      snippet={element.soundSnippet}
                      date={element.soundCreateAt}
                      url={element.url}
                      src={element.soundURL}
                      tagList={element.soundTagList}
                      isLiked={element.isLiked}
                      soundId={element.soundId}
                      key={index}
                    />
                  )
                }) : (
                  <Paper sx={{width: "100%", height: "100%"}}>
                    <Container className={classes.emptySoundContainer}>
                      <Box sx={{ maxWidth: "md", spaceY: 4 }}>
                        <HeadphonesIcon
                          sx={{
                            mx: "auto",
                            height: "48px",
                            width: "48px",
                            color: "text.secondary",
                          }}
                        />
                        <Typography variant="h4" component="h2" fontWeight="bold">
                          Your Favorite Sounds List is Empty
                        </Typography>
                        <Typography color="text.secondary">
                          It looks like you haven't added any favorite sounds yet. <br/>
                          Why don't you explore our library and find some tunes you love? <br/>
                          We can't wait to hear what you discover!
                        </Typography>
                        <Link to="/">
                          <Button variant="contained" className={classes.emptySoundButton}>
                            Explore Sounds
                          </Button>
                        </Link>
                      </Box>
                    </Container>
                  </Paper>
              )
              }
            </Slider>
          </Box>
        </Box>
        <Box className={classes.bottomProfileContainer}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<Logout />}
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default withStyles(styles)(Profile);
