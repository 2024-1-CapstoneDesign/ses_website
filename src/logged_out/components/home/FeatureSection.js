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
import Cookies from "js-cookie";

const mdDelayList = ["0", "200", "400"]
const smDelayList = ["0", "200"]

const fetchSoundList = async () => {
  const url = "https://soundeffect-search.p-e.kr/api/v1/soundeffect" //accessToken을 줘야 받아오지 ㅂㅅ아
  const access_token = Cookies.get('accessToken');
  try {
    let axiosRes;
    if (access_token) {
      axiosRes = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      });
    } else {
      axiosRes = await axios.get(url);
    }
    const resData = axiosRes.data; //fetchResult
    if (resData.result === "SUCCESS"){
      const resSoundList = resData.data.soundEffectDtos.map(({soundEffectId, isLiked, soundEffectName, soundEffectTags, soundEffectTypes}, idx) => {
        return {
          soundId: soundEffectId,
          soundName: soundEffectName,
          isLiked: isLiked,
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
    return [];
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
    staleTime: 0,               // 데이터가 항상 오래된 것으로 간주됨
    refetchOnWindowFocus: true, // 윈도우가 포커스될 때마다 다시 fetch
    refetchOnMount: true,       // 컴포넌트가 마운트될 때마다 다시 fetch
    refetchOnReconnect: true,   // 네트워크가 다시 연결될 때마다 다시 fetch
    cacheTime: 0                // 데이터를 캐싱하지 않음
  });

  return (
    <div style={{ backgroundColor: theme.palette.background.default }}>
      <div className="container-fluid lg-p-top">
        <Typography
          variant="h3" align="center" className="lg-mg-bottom"
          sx={{fontFamily: "'Orbitron', cursive", fontWeight: 'bold'}}
        >
          Today's SoundEffect
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
                    soundId={element.soundId}
                    isLiked={element.isLiked}
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
