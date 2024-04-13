import React from "react";
import {Grid, Typography} from "@mui/material";
import calculateSpacing from "./calculateSpacing";
import useMediaQuery from "@mui/material/useMediaQuery";
import {withTheme} from "@mui/styles";
import FeatureCard from "./FeatureCard";
import useWidth from "../../../shared/functions/useWidth";
import axios from "axios";
import {useQuery} from "react-query";
import SoundCard from "./SoundCard";

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




const mdDelayList = ["0", "200", "400"]
const smDelayList = ["0", "200"]


const fetchSoundList = async () => {
  const url = "https://soundeffect-search.p-e.kr/api/v1/soundeffect"
  try {
    const axiosRes = await axios.get(url);
    const resData = axiosRes.data; //fetchResult
    if (resData.result === "SUCCESS"){
      const resSoundList = resData.data;
      return resSoundList.map(({soundEffectId, soundEffectName, soundEffectTags, soundEffectTypes}, idx) => {
        return {
          soundId: soundEffectId,
          soundName: soundEffectName,
          soundTagList: soundEffectTags,
          soundURL: soundEffectTypes[0].url,
          soundLength: soundEffectTypes[0].length,
          mdDelay: mdDelayList[idx % mdDelayList.length],
          smDelay: smDelayList[idx % smDelayList.length],
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
                sx={{ border: '2px solid red' }}
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
