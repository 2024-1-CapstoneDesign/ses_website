import {useEffect, useRef, useState} from "react";
import WaveSurfer from "wavesurfer.js";
import {Box, IconButton} from "@mui/material";
import {PauseCircle, PlayCircle} from "@mui/icons-material";

import withStyles from "@mui/styles/withStyles";
import theme from "../../../theme";

const styles = () => ({
  waveSurferContainer: {
    width: "100%",
    display: 'flex',
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
          progressColor: theme.palette.primary.main,
          waveColor: theme.palette.secondary.main,
          width: '100%'
        });
      wavesurfer.current.load(audioURL);
      wavesurfer.current.on('ready', () => {
        // 오디오가 준비되면 자동으로 재생하지 않도록 설정
        wavesurfer.current.setVolume(0.5);
        wavesurfer.current.pause();
      });

      wavesurfer.current.on("finish", () => {
        // 오디오가 끝나면 처음부터 재생
        wavesurfer.current.seekTo(0);
        wavesurfer.current.pause();
        setIsPlaying(false);
      });
      // 컴포넌트 언마운트 시 정리 작업 수행
      // 계속 버그 생계서 정리 작업 안하는 방향으로 해봅시다.
      return () => {
        // if (wavesurfer.current) {
        //   wavesurfer.current.destroy();
        // }
      };
    }
  },[audioURL])

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
      <Box ref={waveform} sx={{width: "100%"}} />
        <IconButton onClick={buttonClick}>
          {isPlaying ? <PauseCircle/> : <PlayCircle/>}
        </IconButton>
    </Box>
  );
}


export default withStyles(styles, { withTheme: true })(WaveSurferComponent);