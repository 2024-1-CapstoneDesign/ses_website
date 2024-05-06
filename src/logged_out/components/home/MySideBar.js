import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { Box, Typography, Chip } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import ButtonBase from "@mui/material/ButtonBase";

const styles = (theme) => ({
  sidebarContainer: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    color: "text.primary",
    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
  },
  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "64px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  sidebarBody: {
    padding: "16px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  sidebarFooter: {
    padding: "16px",
  },
  sidebarFooterButton: {
    width: "100%",
    backgroundColor: "#b3294e",
    color: "white",
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
      cursor: "pointer",
    },
    display: "flex",
    alignItems: "center",
  },
  chipWrapper: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  chip: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  chipSelected: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  fullWidth: {
    width: "100%",
  },
});

function MySideBar(props) {
  const { classes, soundListPosts, selectSoundList } = props;
  const [checked, setChecked] = useState([false, false, false, false, false]);
  const [selectedTags, setSelectedTags] = useState(new Set());

  const handleChange = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  useEffect(() => {
    selectSoundList();
  }, [selectSoundList]);

  const uniqueTagList = [
    ...new Set(
      soundListPosts
        .map(({ soundTagList }) => ({ ...soundTagList }))
        .flatMap((obj) => Object.values(obj))
        .map((tag) => tag.tagName)
    ),
  ];

  const handleChipClick = (tagName) => {
    if (selectedTags.has(tagName)) {
      selectedTags.delete(tagName);
    } else {
      selectedTags.add(tagName);
    }
    setSelectedTags(new Set(selectedTags));
  };

  return (
    <Box className={classes.sidebarContainer}>
      <Box className={classes.sidebarBody}>
        <Typography
          variant="h6"
          className={`font-semibold uppercase mt-4 mb-2 text-[#4829B2] text-gray-900 ${classes.fullWidth}`}
        >
          License
        </Typography>
        {[
          "Approved for Free (544,282)",
          "Creative Commons (321,890)",
          "Attribution (222,392)",
          "Attribution NonCommercial (74,513)",
          "Sampling+ (11,475)",
        ].map((label, index) => (
          <Typography
            key={index}
            component="div"
            className={`${classes.licenseLink} ${classes.fullWidth}`}
            role="checkbox"
            aria-checked={checked[index]}
            onClick={() => handleChange(index)}
          >
            <Checkbox
              checked={checked[index]}
              onChange={() => handleChange(index)}
            />
            <Box component="span" display="block">
              {label}
            </Box>
          </Typography>
        ))}
      </Box>
      <Box className={classes.sidebarFooter}>
        <Typography
          variant="h6"
          className={`font-semibold uppercase mt-6 mb-2 text-[#4829B2] text-gray-900 ${classes.fullWidth}`}
        >
          Tags
        </Typography>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {uniqueTagList.map((tagName, index) => (
            <div key={index} className={classes.chipWrapper}>
              <ButtonBase onClick={() => handleChipClick(tagName)}>
                <Chip
                  label={tagName}
                  variant="outlined"
                  size="small"
                  className={
                    selectedTags.has(tagName)
                      ? classes.chipSelected
                      : classes.chip
                  }
                />
              </ButtonBase>
            </div>
          ))}
        </div>
      </Box>
    </Box>
  );
}

MySideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MySideBar);
