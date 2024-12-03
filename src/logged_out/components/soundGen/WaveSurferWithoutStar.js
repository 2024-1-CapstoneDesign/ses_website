import {useEffect, useRef, useState} from "react";
import WaveSurfer from "wavesurfer.js";
import {Box, IconButton} from "@mui/material";
import {PauseCircle, PlayCircle} from "@mui/icons-material";
import withStyles from "@mui/styles/withStyles";
import theme from "../../../theme";

const styles = () => ({
  waveSurferContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: "100%",
  },
  waveformBox: {
    width: "100%",
    height: 100, // 파형 높이 설정
    marginLeft: 10,
  },
  bottomButtonBox: {
    width: "100%",
    height: "100%",
    display: 'flex',
    alignItems: 'center',
    zIndex: 5
  },
});

const WaveSurferWithoutStar = (props) => {
  const {classes, audioBlob, setCurrentTime, setDuration} = props
  const waveform = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
      wavesurfer.current.loadBlob(audioBlob);
      wavesurfer.current.on('ready', () => {
        wavesurfer.current.setVolume(0.5);
        wavesurfer.current.pause();
        if (setDuration){
          setDuration(wavesurfer.current.getDuration());
        }
      });

      wavesurfer.current.on('audioprocess', () => {
        if (setCurrentTime) {
          setCurrentTime(wavesurfer.current.getCurrentTime());
        }
      });

      wavesurfer.current.on("finish", () => {
        wavesurfer.current.seekTo(0);
        wavesurfer.current.pause();
        setIsPlaying(false);
      });
    }
  },[audioBlob, setCurrentTime, setDuration])

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

  return (
    <Box className={classes.waveSurferContainer}>
      <Box className={classes.waveformBox} ref={waveform} />
      <Box className={classes.bottomButtonBox}>
        <IconButton onClick={buttonClick}>
          {isPlaying ? <PauseCircle/> : <PlayCircle/>}
        </IconButton>
      </Box>
    </Box>
  );
}


export default withStyles(styles, { withTheme: true })(WaveSurferWithoutStar);
