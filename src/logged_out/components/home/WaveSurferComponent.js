import {Fragment, useEffect, useRef, useState} from "react";
import WaveSurfer from "wavesurfer.js";
import {IconButton} from "@mui/material";
import {PauseCircle, PlayCircle} from "@mui/icons-material";

const WaveSurferComponent = ({audioURL}) => {
  const waveform = useRef(null);
  const wavesurfer = useRef(null);
  const [colorType, setColorType] = useState(null);
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
          progressColor: colorType,
          waveColor: '#FF00FF',
          width: '50%'
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
  },[audioURL, colorType])

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
    <Fragment>
      <div ref={waveform}>
        <IconButton onClick={buttonClick}>
          {isPlaying ? <PauseCircle/> : <PlayCircle/>}
        </IconButton>
      </div>
    </Fragment>
  );
}

export default WaveSurferComponent;