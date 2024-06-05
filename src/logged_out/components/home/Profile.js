import React, {useCallback, useEffect, useRef, useState} from "react";
import { withStyles } from "@mui/styles";
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Grid, Box, Button
} from "@mui/material";
import classNames from "classnames";
import {Logout} from "@mui/icons-material";
import {useHistory} from "react-router-dom";
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
});

function Profile(props) {
  const { classes, selectProfile, setSoundListPosts} = props;
  const userObj = JSON.parse(localStorage.getItem("userinfo"));
  const access_token = Cookies.get('accessToken');
  console.log(access_token);
  const history = useHistory();
  const [likeSoundList, setLikeSoundList] = useState(null);
  const sliderRef = useRef(null);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(likeSoundList ? likeSoundList.length : 3, 3),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(likeSoundList ? likeSoundList.length : 2, 2),
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
              soundDescription: soundEffect.description,
              soundCreateBy: soundEffect.createBy,
              soundCreateAt: formatDateTime(soundEffect.createdAt),
              soundSnippet: soundEffect.summary,
              isLiked: soundEffect.isLiked,
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

  return (
    <Container className={classNames(classes.container, "lg-p-top")}>
      <Paper className={classes.paper}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item>
            <Avatar
              alt="User Avatar"
              className={classes.avatar}
              src={userObj.picture}
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
                likeSoundList.map(element => {
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
                    />
                  )
                })
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
