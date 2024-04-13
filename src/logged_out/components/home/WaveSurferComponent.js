import {useEffect, useRef, useState} from "react";
import WaveSurfer from "wavesurfer.js";
import {Box, IconButton} from "@mui/material";
import {PauseCircle, PlayCircle} from "@mui/icons-material";

import withStyles from "@mui/styles/withStyles";

const styles = (theme) => ({
  waveSurferContainer: {
    border: "2px solid green",
    width: "100%"
  }
});

const WaveSurferComponent = (props) => {
  const {classes, audioURL} = props
  const waveform = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // https://wavesurfer-js.org/docs/methods.html
  useEffect(() => {
    if(waveform.current){
      // waveform.current가 읽혀지면 시작됨
      wavesurfer.current =
        WaveSurfer.create({
          container: waveform.current, // ref로 연결했기 때문에 current로 연결해주기
          barWidth: 4, // 막대 하나의 width값
          barHeight: 1,
          barGap: 2,
          progressColor: "#FFFF00",
          waveColor: '#FF00FF',
          width: '100%'
        });
      wavesurfer.current.load(audioURL);
      wavesurfer.current.on('ready', () => {
        // 오디오가 준비되면 자동으로 재생하지 않도록 설정
        wavesurfer.current.setVolume(0.5);
        wavesurfer.current.pause();
      });
      // 컴포넌트 언마운트 시 정리 작업 수행
      return () => {
        if (wavesurfer.current) {
          wavesurfer.current.destroy();
        }
      };
    }
  },[audioURL])

  const buttonClick = () => {
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
      <Box ref={waveform} className={classes.waveSurferContainer}>
        <IconButton onClick={buttonClick}>
          {isPlaying ? <PauseCircle/> : <PlayCircle/>}
        </IconButton>
      </Box>
  );
}


export default withStyles(styles, { withTheme: true })(WaveSurferComponent);