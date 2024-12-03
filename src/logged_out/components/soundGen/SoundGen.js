import React, {useEffect, useState} from "react";
import withStyles from "@mui/styles/withStyles";
import {Box, Button, Card, Divider, Grid, keyframes, Stack, Typography} from "@mui/material";
import axios from "axios";
import {styled} from "@mui/material/styles";
import WaveSurferWithoutStar from "./WaveSurferWithoutStar";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import SoundDetailPaper from "../soundList/SoundDetailPaper";

const jump = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const styles = (theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
  },
  headingContainer: {
    width: "800px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
  },
  logoContainer: {
    width: "100%",
    fontFamily: "'Orbitron', cursive",
    fontWeight: 500
  },
  innerContainer: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "0.05rem solid #bfbfbf",
    borderRadius: "1rem",
    padding: "1rem",
    boxShadow: "0px 4px 16px 0px #bfbfbf"
  },
  searchBar: {
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    fontFamily: 'Roboto',
    fontSize: "1rem",
    color: "#64748b",
    outline: "none",
    "&:hover": {
      outline: "none",
    }
  },
  searchIcon: {
    width: "1rem",
    marginRight: "1rem",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.5rem",
  },
  blogContentWrapper: {
    backgroundColor: theme.palette.background.default,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    marginBottom: theme.spacing(-50),
    maxWidth: 1280,
    width: "100%",
  },
  card: {
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[4],
  },
  titleContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleButtonContainer:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  itemPaperContainer:{
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
  },
});

const Letter = styled('span')(({ delay, animate }) => ({
  display: 'inline-block',
  animation: animate ? `${jump} 4s infinite` : 'none',
  animationDelay: delay,
}));

function SoundGen(props) {
  const {classes,  selectSoundGen} = props;
  const [input, setInput] = useState("");
  const [animate, setAnimate] = useState(false);
  const [soundBlob, setSoundBlob] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [soundEffectName, setSoundEffectName] = useState("");
  const [soundEffectTypes, setSoundEffectTypes] = useState([]);
  const [description, setDescription] = useState("");
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    // 시, 분, 초를 두 자리수로 표시하고 앞에 0을 붙임
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };
  const inputChange = (event) => {
    setInput(event.target.value);
  }
  const sendToServer = async (event) => {
    if (event.key === "Enter") {
      const englishRegex = /^[a-zA-Z\s.,!?'"]+$/;
      if (!englishRegex.test(input)) {
        alert("This service is available English only");
        setInput("");
        return;
      }

      const url = "https://soundeffect-search.p-e.kr/api/v1/soundeffect"
      try{
        setAnimate(true);
        setSoundBlob(null);
        const resData = await axios.post(url, { input });
        if (resData.status !== 200) return;
        const {file: soundEffectBytes} = resData.data.data;
        setSoundEffectName(resData.data.data.soundEffectName);
        setSoundEffectTypes(resData.data.data.soundEffectTypes);
        setDescription(resData.data.data.description);
        // Base64 디코딩 및 Blob 생성
        const byteCharacters = atob(soundEffectBytes);
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'audio/wav' });
        setSoundBlob(blob); // soundBlob 상태 업데이트

        // // 다운로드 링크 생성
        // const link = document.createElement('a');
        // link.href = window.URL.createObjectURL(blob);
        // link.download = soundEffectName;
        //
        // // 링크 클릭 및 정리
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        //
        // // Blob URL 해제
        // window.URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error(error);
      } finally {
        setAnimate(false); // 애니메이션 종료
      }
    }
  }

  useEffect(() => {
    selectSoundGen();
  }, [selectSoundGen]);
  
  return (
    <Box className={classes.container}>
      <Box className={classes.headingContainer}>
        <Typography
          className={classes.logoContainer}
          variant="h1"
        >
          <Letter style={{ color: '#4285F4' }} delay="0s" animate={animate}>A</Letter>
          <Letter style={{ color: '#EA4335' }} delay="1s" animate={animate}>u</Letter>
          <Letter style={{ color: '#FBBC05' }} delay="2s" animate={animate}>L</Letter>
          <Letter style={{ color: '#34A853' }} delay="3s" animate={animate}>o</Letter>
        </Typography>
      </Box>
      <Box className={classes.innerContainer}>
        <Box className={classes.searchContainer}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
            alt="search icon"
            className={classes.searchIcon}
          />
          <input
            type="search"
            className={classes.searchBar}
            value={input}
            placeholder="Search Aulo"
            onChange={inputChange}
            onKeyDown={sendToServer}
          />
        </Box>
      </Box>
      {soundBlob && (
        <Box className={classes.blogContentWrapper}>
          <Box sx={{display: "flex", justifyContent: "center"}}>
            <Grid item md={9}>
              <Card className={classes.card}>
                <Box sx={{border: '2px solid black'}}>
                  <WaveSurferWithoutStar
                    audioBlob={soundBlob}
                    setCurrentTime={setCurrentTime}
                    setDuration={setDuration}
                  />
                </Box>
                <Box pt={1} pr={3} pl={3} className={classes.titleContainer}>
                  <Typography>
                    {formatTime(currentTime)}
                  </Typography>
                  <Typography>
                    {formatTime(duration)}
                  </Typography>
                </Box>
                <Box pt={3} pr={3} pl={3} pb={2} className={classes.titleContainer}>
                  <Box>
                    <Typography variant="h4">
                      <b>{soundEffectName}</b>
                    </Typography>
                  </Box>
                  <Box className={classes.titleButtonContainer}>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudDownloadIcon />}
                      // onClick={handleDownload}
                    >
                      Download
                    </Button>
                  </Box>
                </Box>
                <Box p={3}>
                  <Typography paragraph>
                    {description}
                  </Typography>
                  <Divider />
                  <Box pt={2} sx={{display:'flex', justifyContent: 'center'}}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}
                      sx={{width: '100%', height: '100%'}}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <SoundDetailPaper title="Type" value={"wav"} />
                      <SoundDetailPaper title="Duration" value={soundEffectTypes?.length + "s"} />
                      <SoundDetailPaper title="File Size" value={soundEffectTypes?.fileSize + "MB"} />
                      <SoundDetailPaper title="Sample Rate" value={soundEffectTypes?.sampleRate + "HZ"} />
                      <SoundDetailPaper title="Bit depth" value={soundEffectTypes?.bitDepth + "bit"} />
                      <SoundDetailPaper title="Channels" value={soundEffectTypes?.channels} />
                    </Stack>
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default withStyles(styles, {withTheme: true})(SoundGen);
