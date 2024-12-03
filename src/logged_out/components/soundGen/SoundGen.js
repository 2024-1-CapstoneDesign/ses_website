import React, {useEffect, useState} from "react";
import withStyles from "@mui/styles/withStyles";
import {Box, Typography} from "@mui/material";
import axios from "axios";

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

function SoundGen(props) {
  const {classes,  selectSoundGen} = props;
  const [input, setInput] = useState("");
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
        const resData = await axios.post(url, {
          input: input,
        });
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
          <span style={{color: '#4285F4'}}>A</span>
          <span style={{color: '#EA4335'}}>u</span>
          <span style={{color: '#FBBC05'}}>L</span>
          <span style={{color: '#34A853'}}>o</span>
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
