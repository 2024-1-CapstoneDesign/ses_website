import React, {useEffect, useState} from "react";
import withStyles from "@mui/styles/withStyles";
import {Box} from "@mui/material";

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
  },
  googleLogo: {
    width: "25%"
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
  const inputChange = (e) => {
    setInput(e.target.value);
  }

  useEffect(() => {
    selectSoundGen();
  }, [selectSoundGen]);
  
  return (
    <Box className={classes.container}>
      <Box className={classes.headingContainer}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/google-logo.png"
          className={classes.googleLogo}
          alt="google logo"
        />
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
            placeholder="Search Google"
            onChange={inputChange}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default withStyles(styles, {withTheme: true})(SoundGen);
