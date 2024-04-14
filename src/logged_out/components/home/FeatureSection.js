import React from "react";
import {Grid, Typography} from "@mui/material";
import calculateSpacing from "./calculateSpacing";
import useMediaQuery from "@mui/material/useMediaQuery";
import {withTheme} from "@mui/styles";
import useWidth from "../../../shared/functions/useWidth";
import axios from "axios";
import {useQuery} from "react-query";
import SoundCard from "./SoundCard";
import MoreButton from "./MoreButton";

const mdDelayList = ["0", "200", "400"]
const smDelayList = ["0", "200"]

const fetchSoundList = async () => {
  const url = "https://soundeffect-search.p-e.kr/api/v1/soundeffect"
  try {
    const axiosRes = await axios.get(url);
    const resData = axiosRes.data; //fetchResult
    if (resData.result === "SUCCESS"){
      const resSoundList = resData.data.map(({soundEffectId, soundEffectName, soundEffectTags, soundEffectTypes}, idx) => {
        return {
          soundId: soundEffectId,
          soundName: soundEffectName,
          soundTagList: soundEffectTags,
          soundURL: soundEffectTypes[0].url,
          soundLength: soundEffectTypes[0].length,
          mdDelay: mdDelayList[idx % mdDelayList.length],
          smDelay: smDelayList[idx % smDelayList.length],
        }
      });
      return resSoundList.slice(0, 5).concat({
        soundId: -1
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
            {!isLoading && response.map((element) => {
              if (element.soundId === -1){
                return (
                  <Grid item xs={6} md={4} data-aos="zoom-in-up"
                              data-aos-delay={isWidthUpMd ? element.mdDelay : element.smDelay}
                              key={element.soundId.toString()}
                  >
                    <MoreButton />
                  </Grid>
                )
              }
              return (
                <Grid item xs={6} md={4} data-aos="zoom-in-up"
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
              )}
            )}
          </Grid>
        </div>
      </div>
    </div>
  );
}

FeatureSection.propTypes = {};

export default withTheme(FeatureSection);
