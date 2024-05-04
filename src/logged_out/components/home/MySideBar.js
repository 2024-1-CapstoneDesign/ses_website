import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { Box, Typography, Chip } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const styles = (theme) => ({
  sidebarContainer: {
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: "white",
    color: "text.primary",
    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '64px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  sidebarBody: {
    padding: '16px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  sidebarFooter: {
    padding: '16px',
  },
  sidebarFooterButton: {
    width: '100%',
    backgroundColor: "#b3294e",
    color: 'white',
    "&:hover": {
      backgroundColor: "#9c2345",
    },
  },
  licenseLink: {
    color: "text.primary",
    fontSize: "0.875rem",
    marginBottom: "8px",
    "&:hover": {
      color: "#b3294e",
      cursor: "pointer", // 클릭 가능한 상태로 설정
    },
    display: "flex",
    alignItems: "center",
  },
  chip: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    marginRight: "8px",
    marginBottom: "8px",
  },
  fullWidth: {
    width: '100%',
  },
});

function MySiderBar(props) {
  const { classes } = props;
  const [checked, setChecked] = useState([false, false, false, false, false]);

  const handleChange = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  return (
    <Box className={classes.sidebarContainer}>
      <Box className={classes.sidebarBody}>
        <Typography variant="h6" className={`font-semibold uppercase mt-4 mb-2 text-[#4829B2] text-gray-900 ${classes.fullWidth}`}>License</Typography>
        <Typography component="div" className={`${classes.licenseLink} ${classes.fullWidth}`} role="checkbox" aria-checked={checked[0]} onClick={() => handleChange(0)}>
          <Checkbox checked={checked[0]} onChange={() => handleChange(0)} />
          <Box component="span" display="block">Approved for Free (544,282)</Box>
        </Typography>
        <Typography component="div" className={`${classes.licenseLink} ${classes.fullWidth}`} role="checkbox" aria-checked={checked[1]} onClick={() => handleChange(1)}>
          <Checkbox checked={checked[1]} onChange={() => handleChange(1)} />
          <Box component="span" display="block">Creative Commons (321,890)</Box>
        </Typography>
        <Typography component="div" className={`${classes.licenseLink} ${classes.fullWidth}`} role="checkbox" aria-checked={checked[2]} onClick={() => handleChange(2)}>
          <Checkbox checked={checked[2]} onChange={() => handleChange(2)} />
          <Box component="span" display="block">Attribution (222,392)</Box>
        </Typography>
        <Typography component="div" className={`${classes.licenseLink} ${classes.fullWidth}`} role="checkbox" aria-checked={checked[3]} onClick={() => handleChange(3)}>
          <Checkbox checked={checked[3]} onChange={() => handleChange(3)} />
          <Box component="span" display="block">Attribution NonCommercial (74,513)</Box>
        </Typography>
        <Typography component="div" className={`${classes.licenseLink} ${classes.fullWidth}`} role="checkbox" aria-checked={checked[4]} onClick={() => handleChange(4)}>
          <Checkbox checked={checked[4]} onChange={() => handleChange(4)} />
          <Box component="span" display="block">Sampling+ (11,475)</Box>
        </Typography>
      </Box>
      <Box className={classes.sidebarFooter}>
        <Typography variant="h6" className={`font-semibold uppercase mt-6 mb-2 text-[#4829B2] text-gray-900 ${classes.fullWidth}`}>Tags</Typography>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Chip label="multisample" variant="outlined" className={classes.chip} />
          <Chip label="field-recording" variant="outlined" className={classes.chip} />
          <Chip label="single-note" variant="outlined" className={classes.chip} />
          <Chip label="synthesizer" variant="outlined" className={classes.chip} />
          <Chip label="drum" variant="outlined" className={classes.chip} />
          <Chip label="loop" variant="outlined" className={classes.chip} />
          <Chip label="synth" variant="outlined" className={classes.chip} />
          <Chip label="noise" variant="outlined" className={classes.chip} />
          <Chip label="ambient" variant="outlined" className={classes.chip} />
        </div>
      </Box>
    </Box>
  );
}

MySiderBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MySiderBar);
