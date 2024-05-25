import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { Box, Typography, Chip } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import MySidebarElement from "./MySidebarElement";

function shadeColor(color, percent) {

  let R = parseInt(color.substring(1,3),16);
  let G = parseInt(color.substring(3,5),16);
  let B = parseInt(color.substring(5,7),16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R<255)?R:255;
  G = (G<255)?G:255;
  B = (B<255)?B:255;

  R = Math.round(R)
  G = Math.round(G)
  B = Math.round(B)

  const RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
  const GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
  const BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}

const styles = (theme) => ({
  sidebarContainer: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.default,
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
  },
  chipSelected: {
    backgroundColor: shadeColor(theme.palette.secondary.main, 100),
    color: "white",
    cursor: "pointer",
  },
  fullWidth: {
    width: "100%",
  },
});

function MySideBar(props) {
  const { classes, soundListPosts, selectSoundList, setSoundListPosts, filterList, setFilterList, setPage } = props;
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [isSelected, setIsSelected] = useState(null);

  const uniqueTagList = [
    ...new Set(
      soundListPosts
        .map(({ soundTagList }) => ({ ...soundTagList }))
        .flatMap((obj) => Object.values(obj))
        .map((tag) => tag.tagName)
    ),
  ];

  const resetVisibility = () => {
    const updatedSoundListPosts = soundListPosts.map(sound => {
      return {
        ...sound,
        soundVisible: true
      };
    });
    setSoundListPosts(updatedSoundListPosts);
  }

  useEffect(() => {
    selectSoundList();
    setSelectedTags(new Set());
    resetVisibility();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectSoundList]);

  const handleChipClick = (tagName) => {
    const newSelectedTags = new Set(selectedTags);
    if (selectedTags.has(tagName)) {
      newSelectedTags.delete(tagName);
    } else {
      newSelectedTags.add(tagName);
    }
    setSelectedTags(newSelectedTags);
    const updatedSoundListPosts = soundListPosts.map(sound => {
      let isTagSelected = sound.soundTagList.some((element) => newSelectedTags.has(element.tagName))
      if (newSelectedTags.size === 0){ // 만약 모든 tag가 비어있다면 다시 전체 soundCard가 보이게 만들기
        isTagSelected = true
      }
      return {
        ...sound,
        soundVisible: isTagSelected
      };
    });
    setSoundListPosts(updatedSoundListPosts);

    const newIsSelected = new Array(isSelected.length).fill(false);
    setIsSelected(newIsSelected);
  };
  const typeElementList = [
    {
      value: ["wav"],
      label: "wav"
    },
    {
      value: ["mp3"],
      label: "mp3"
    },
    {
      value: ["aiff"],
      label: "aiff"
    },
    {
      value: ["flac"],
      label: "flac"
    },
    {
      value: ["m4a"],
      label: "m4a"
    },
  ].map(element => {
    return {
      ...element,
      id: 0,
    }
  });

  const durationElementList = [
    {
      value: [0, 10],
      label: "0s ~ 10s"
    },
    {
      value: [11, 15],
      label: "11s ~ 15s"
    },
    {
      value: [16, 20],
      label: "16s ~ 20s"
    },
    {
      value: [21, 25],
      label: "21s ~ 25s"
    },
    {
      value: [26, 100],
      label: "upper to 25s"
    },
  ].map(element => {
    return {
      ...element,
      id: 1,
    }
  });

  const fileSizeElementList = [
    {
      value: [0, 1],
      label: "0MB ~ 1MB",
    },
    {
      value: [1, 2],
      label: "1MB ~ 2MB",
    },
    {
      value: [2, 3],
      label: "2MB ~ 3MB",
    },
    {
      value: [3, 4],
      label: "3MB ~ 4MB",
    },
    {
      value: [4, 100],
      label: "upper to 4MB",
    },
  ].map(element => {
    return {
      ...element,
      id: 2,
    }
  });

  const sampleRateElementList = [
    {
      value: [22050],
      label: "22050HZ",
    },
    {
      value: [44100],
      label: "44100HZ",
    },
    {
      value: [48000],
      label: "48000HZ",
    },
    {
      value: [96000],
      label: "96000HZ",
    },
    {
      value: [192000],
      label: "192000HZ",
    },
  ].map(element => {
    return {
      ...element,
      id: 3,
    }
  });

  const bitDepthElementList = [
    {
      value: [8],
      label: "8bit",
    },
    {
      value: [16],
      label: "16bit",
    },
    {
      value: [24],
      label: "24bit",
    },
    {
      value: [32],
      label: "32bit",
    },
  ].map(element => {
    return {
      ...element,
      id: 4,
    }
  });

  const ChannelElementList = [
    {
      value: ["Stereo"],
      label: "Stereo",
    },
  ].map(element => {
    return {
      ...element,
      id: 5,
    }
  });


  return ( //type, duration, filesize, sample rate, bit depth, channels
    <Box className={classes.sidebarContainer}>
      <MySidebarElement
        elementName={"Type"}
        elementList={typeElementList}
        selectSoundList={selectSoundList}
        filterList={filterList}
        setFilterList={setFilterList}
        setPage={setPage}
      />
      <MySidebarElement
        elementName={"Duration"}
        elementList={durationElementList}
        selectSoundList={selectSoundList}
        filterList={filterList}
        setFilterList={setFilterList}
        setPage={setPage}
      />
      <MySidebarElement
        elementName={"File Size"}
        elementList={fileSizeElementList}
        selectSoundList={selectSoundList}
        filterList={filterList}
        setFilterList={setFilterList}
        setPage={setPage}
      />
      <MySidebarElement
        elementName={"Sample Rate"}
        elementList={sampleRateElementList}
        selectSoundList={selectSoundList}
        filterList={filterList}
        setFilterList={setFilterList}
        setPage={setPage}
      />
      <MySidebarElement
        elementName={"Bit Depth"}
        elementList={bitDepthElementList}
        selectSoundList={selectSoundList}
        filterList={filterList}
        setFilterList={setFilterList}
        setPage={setPage}
      />
      <MySidebarElement
        elementName={"Channels"}
        elementList={ChannelElementList}
        selectSoundList={selectSoundList}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        filterList={filterList}
        setFilterList={setFilterList}
        setPage={setPage}
      />
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
