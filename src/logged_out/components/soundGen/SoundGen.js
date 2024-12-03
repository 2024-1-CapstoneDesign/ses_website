import React, {useEffect, useState} from "react";
import withStyles from "@mui/styles/withStyles";
import {Box, keyframes, Typography} from "@mui/material";
import axios from "axios";
import {styled} from "@mui/material/styles";

const jump = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const styles = () => ({
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
        const resData = await axios.post(url, { input });
        if (resData.status !== 200) return;
        const {file: soundEffectBytes, soundEffectName, soundEffectTypes} = resData.data.data;
        // Base64 디코딩 및 Blob 생성
        const byteCharacters = atob(soundEffectBytes);
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'audio/wav' });

        // 다운로드 링크 생성
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = soundEffectName;

        // 링크 클릭 및 정리
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Blob URL 해제
        window.URL.revokeObjectURL(link.href);
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
    </Box>
  );
}

export default withStyles(styles, {withTheme: true})(SoundGen);
