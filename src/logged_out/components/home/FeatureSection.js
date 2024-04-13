import React from "react";
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
import SoundCard from "./SoundCard";

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


const fetchResult = {
    "result": "SUCCESS",
    "data": [
      {
        "soundEffectId": 1,
        "soundEffectName": "test",
        "description": null,
        "createBy": null,
        "createdAt": null,
        "soundEffectTags": [
          {
            "tagId": 1,
            "tagName": "sunny"
          },
          {
            "tagId": 2,
            "tagName": "happy"
          },
          {
            "tagId": 3,
            "tagName": "funny"
          }
        ],
        "soundEffectTypes": [
          {
            "url": "https://soundeffectsearch.s3.ap-northeast-2.amazonaws.com/ILLIT+(%E1%84%8B%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%85%E1%85%B5%E1%86%BA)+%E2%80%98Magnetic%E2%80%99+Visual+Teaser.wav",
            "soundEffectTypeName": "wav",
            "length": null
          }
        ]
      }
    ],
    "message": null,
    "code": null,
    "errors": null
}







const fetchSoundList = async () => {
  const url = "https://soundeffect-search.p-e.kr/api/v1/soundeffect"
  try {
    const axiosRes = await axios.get(url);
    const resData = axiosRes.data; //fetchResult
    if (resData.result === "SUCCESS"){
      const resSoundList = resData.data;
      return resSoundList.map(({soundEffectId, soundEffectName, soundEffectTags, soundEffectTypes}) => {
        return {
          soundId: soundEffectId,
          soundName: soundEffectName,
          soundTagList: soundEffectTags,
          soundURL: soundEffectTypes[0].url,
          soundLength: soundEffectTypes[0].length,
        }
      })
    }
    return {
      errorMessage: "Server Error",
    };
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

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
          SoundList
        </Typography>
        {isLoading && <strong>Loading....</strong>}
        {isError && <strong>{response?.errorMessage}</strong>}
        <div className="container-fluid">
          <Grid container spacing={calculateSpacing(width, theme)}>
            {!isLoading && response.map((element) => (
              <Grid
                item
                xs={6}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={isWidthUpMd ? element.mdDelay : element.smDelay}
                key={element.soundId.toString()}
              >
                <SoundCard
                  soundName={element.soundName}
                  soundTagList={element.soundTagList}
                  soundURL={element.soundURL}
                  soundLength={element.soundLength}
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
