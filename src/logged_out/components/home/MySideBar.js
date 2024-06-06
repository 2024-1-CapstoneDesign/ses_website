import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { Box, Typography, Chip } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import MySidebarElement from "./MySidebarElement";
import MySearchField from "./MySearchField";

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
    width: "25vw",
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
  const { classes, soundListPosts, selectSoundList, filterList, setFilterList, setPage } = props;
  const [selectedTags, setSelectedTags] = useState(new Set());

  const uniqueTagList = [
    ...new Map(
      soundListPosts
        .flatMap(({ soundTagList }) => Object.values(soundTagList))
        .map(tag => [tag.tagId, tag])
    ).values()
  ];

  useEffect(() => {
    selectSoundList();
    const newSelectedTag = new Set();
    filterList[7]?.forEach(id => {
      const res = uniqueTagList.find(({tagId}) => tagId === id);
      if (res)
        newSelectedTag.add(res.tagName);
    });
    setSelectedTags(newSelectedTag);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectSoundList]);

  // http://localhost:3000/soundList/card/oh-hell-no
  const handleChipClick = ({tagName, tagId}) => {
    const newFilterList = [...filterList];
    const newSelectedTagIds = new Set(filterList[7]);
    const newSelectedTags = new Set(selectedTags);
    if (selectedTags.has(tagName)) {
      newSelectedTags.delete(tagName);
      newSelectedTagIds.delete(tagId);
    } else {
      newSelectedTags.add(tagName);
      newSelectedTagIds.add(tagId);
    }
    setSelectedTags(newSelectedTags);
    newFilterList[7] = [...newSelectedTagIds];
    setFilterList(newFilterList);
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
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
    }
  });


  return ( //type, duration, filesize, sample rate, bit depth, channels
    <Box className={classes.sidebarContainer}>
      <MySearchField
        filterList={filterList}
        setFilterList={setFilterList}
        selectSoundList={selectSoundList}
      />
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
          {uniqueTagList.map((tagElement, index) => (
            <div key={index} className={classes.chipWrapper}>
              <ButtonBase onClick={() => handleChipClick(tagElement)}>
                <Chip
                  label={tagElement.tagName}
                  size="small"
                  className={
                    selectedTags.has(tagElement.tagName)
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
