import {useEffect, useRef, useState} from "react";
import WaveSurfer from "wavesurfer.js";
import {Box, IconButton} from "@mui/material";
import {PauseCircle, PlayCircle, Star, StarOutline} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import withStyles from "@mui/styles/withStyles";
import theme from "../../../theme";
import Cookies from "js-cookie";
import axios from "axios";

const styles = () => ({
  waveSurferContainer: {
    display: 'flex',
    flexDirection: 'column', // 컨테이너를 열 방향으로 배치
    alignItems: 'flex-start', // 컨텐츠를 왼쪽 정렬
    width: "100%",
  },
  waveformBox: {
    width: "100%",
    height: 100, // 파형 높이 설정
    marginLeft: 10,
    marginTop: -20
  },
  topButtonBox: {
    width: "100%",
    height: "100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    // border: '1px solid red',
    zIndex: 5
  },
  bottomButtonBox: {
    width: "100%",
    height: "100%",
    display: 'flex',
    alignItems: 'center',
    // border: '1px solid red',
    zIndex: 5
  },
});

const WaveSurferComponent = (props) => {
  const {classes, audioURL, setCurrentTime, setDuration, isLiked, soundId} = props
  const waveform = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStared, setIsStared] = useState(isLiked);
  const location = useLocation();

  useEffect(() => {
    if(waveform.current){
      wavesurfer.current =
        WaveSurfer.create({
          container: waveform.current,
          barWidth: 4,
          barHeight: 1,
          barGap: 2,
          progressColor: theme.palette.primary.main,
          waveColor: theme.palette.secondary.main,
          width: '100%'
        });
      wavesurfer.current.load(audioURL);
      wavesurfer.current.on('ready', () => {
        wavesurfer.current.setVolume(0.5);
        wavesurfer.current.pause();
        if (setDuration){
          setDuration(wavesurfer.current.getDuration());
        }
      });

      wavesurfer.current.on("finish", () => {
        wavesurfer.current.seekTo(0);
        wavesurfer.current.pause();
        setIsPlaying(false);
      });

      wavesurfer.current.on('audioprocess', () => {
        if (setCurrentTime) {
          setCurrentTime(wavesurfer.current.getCurrentTime());
        }
      });
    }
  },[audioURL, setCurrentTime, setDuration])

  const buttonClick = (event) => {
    event.preventDefault();
    if (wavesurfer.current) {
      if (isPlaying) {
        wavesurfer.current.pause();
      } else {
        wavesurfer.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  const starButtonClick = (event) => {
    event.preventDefault();
    const userObj = JSON.parse(localStorage.getItem("userinfo"));
    const access_token = Cookies.get('accessToken');
    const refresh_token = Cookies.get('refreshToken');
    // there are no login or no access_token or no refresh token
    if (userObj === null || access_token === null || refresh_token === null) {
      alert("You need to log in to use this feature")
      return;
    }

    setIsStared(!isStared);
    // 좋아요를 누른 경우
    if (!isStared){
      axios.put(`https://soundeffect-search.p-e.kr/api/v1/soundeffect/${soundId}/like`, {},{
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      })
        .then(res => {
          if (location.pathname === "/profile") {
            window.location.reload();
          }
      }).catch(e => {
        console.error(e);
      });
    } //그렇지 않은 경우
    else {
      axios.put(`https://soundeffect-search.p-e.kr/api/v1/soundeffect/${soundId}/unlike`, {},{
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      })
        .then(res => {
          console.log(location.pathname === "/profile")
          if (location.pathname === "/profile") {
            window.location.reload();
          }
        }).catch(e => {
        console.error(e);
      });
    }
  }

  return (
    <Box className={classes.waveSurferContainer}>
      <Box className={classes.topButtonBox}>
        <IconButton onClick={starButtonClick}>
          {isStared ? <Star sx={{color: "#FFBF00"}}/> : <StarOutline/>}
        </IconButton>
      </Box>
      <Box className={classes.waveformBox} ref={waveform} />
      <Box className={classes.bottomButtonBox}>
        <IconButton onClick={buttonClick}>
          {isPlaying ? <PauseCircle/> : <PlayCircle/>}
        </IconButton>
      </Box>
    </Box>
  );
}


export default withStyles(styles, { withTheme: true })(WaveSurferComponent);
