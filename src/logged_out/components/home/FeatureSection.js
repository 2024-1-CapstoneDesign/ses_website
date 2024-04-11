import React, {useEffect, useRef, useState} from "react";
import {Grid, Typography} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import BuildIcon from "@mui/icons-material/Build";
import ComputerIcon from "@mui/icons-material/Computer";
import BarChartIcon from "@mui/icons-material/BarChart";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloudIcon from "@mui/icons-material/Cloud";
import MeassageIcon from "@mui/icons-material/Message";
import CancelIcon from "@mui/icons-material/Cancel";
import calculateSpacing from "./calculateSpacing";
import useMediaQuery from "@mui/material/useMediaQuery";
import {withTheme} from "@mui/styles";
import FeatureCard from "./FeatureCard";
import useWidth from "../../../shared/functions/useWidth";
import axios from "axios";
import {useQuery} from "react-query";
import WaveSurfer from "wavesurfer.js";

const iconSize = 30;

const features = [
  {
    color: "#00C853",
    headline: "Feature 1",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <BuildIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0",
  },
  {
    color: "#6200EA",
    headline: "Feature 2",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <CalendarTodayIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200",
  },
  {
    color: "#0091EA",
    headline: "Feature 3",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <MeassageIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0",
  },
  {
    color: "#d50000",
    headline: "Feature 4",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <ComputerIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "200",
  },
  {
    color: "#DD2C00",
    headline: "Feature 5",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <BarChartIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "0",
  },
  {
    color: "#64DD17",
    headline: "Feature 6",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <HeadsetMicIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "200",
  },
  {
    color: "#304FFE",
    headline: "Feature 7",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <CloudIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0",
  },
  {
    color: "#C51162",
    headline: "Feature 8",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <CodeIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200",
  },
  {
    color: "#00B8D4",
    headline: "Feature 9",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <CancelIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0",
  },
];

const fetchSoundList = async () => {
  const url = "https://soundeffect-search.p-e.kr/api/v1/test/download"
  try {
    const res = await axios.get(url);
    // console.dir(res)
    return res.data;
  } catch (e){
    console.error(e);
    throw e;
  }
}


function FeatureSection(props) {
  const { theme } = props;
  const width = useWidth();
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const {
    isLoading,
    isError,
    data: response
  } = useQuery('soundList', fetchSoundList, {
    refetchOnWindowFocus: false
  });
  const waveform = useRef(null);
  const wavesurfer = useRef(null);
  const audioURL = "https://soundeffectsearch.s3.ap-northeast-2.amazonaws.com/ILLIT+(%E1%84%8B%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%85%E1%85%B5%E1%86%BA)+%E2%80%98Magnetic%E2%80%99+Visual+Teaser.wav"
  // const audioURL = "src/logged_out/dummy_data/example.wav";
  const [colorType, setColorType] = useState(null);

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
      console.dir(wavesurfer.current)
      wavesurfer.current.load(audioURL);
      wavesurfer.current.on('click', () => {
        // https://wavesurfer-js.org/docs/methods.html
        wavesurfer.current.setVolume(0.5);
        wavesurfer.current.play()
      })
    }
  },[])

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
          Features
        </Typography>
        <div ref={waveform}>hello</div>
        {isLoading && <strong>Loading....</strong>}
        {isError && <strong>{response?.errorMessage}</strong>}
        <div className="container-fluid">
          <Grid container spacing={calculateSpacing(width, theme)}>
            {features.map((element) => (
              <Grid
                item
                xs={6}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={isWidthUpMd ? element.mdDelay : element.smDelay}
                key={element.headline}
              >
                <FeatureCard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.headline}
                  text={element.text}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

FeatureSection.propTypes = {};

export default withTheme(FeatureSection);
