import {withStyles} from "@mui/styles";
import {Box, Typography} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

const styles = () => ({
  sidebarBody: {
    padding: "16px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
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
  fullWidth: {
    width: "100%",
  },
});

function MySidebarElement(props) {
  const {classes, elementName, elementList,
    selectSoundList, filterList, setFilterList, setPage} = props;
  const [checked, setChecked] = useState([false, false, false, false, false]);

  const handleChange = (index) => {
    const newChecked = new Array(checked.length).fill(false);
    newChecked[index] = !checked[index];
    setChecked(newChecked);

    const newFilterList = [...filterList];
    if (newChecked[index]) {
      const id = elementList[index].id;
      newFilterList[id] = elementList[index];
    } else {
      const id = elementList[index].id;
      newFilterList[id] = 0;
    }
    setFilterList(newFilterList);
    setPage(0);
  };

  useEffect(() => {
    selectSoundList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectSoundList]);

  return (
    <Box className={classes.sidebarBody}>
      <Typography
        variant="h6"
        className={`font-semibold uppercase mt-4 mb-2 text-[#4829B2] text-gray-900 ${classes.fullWidth}`}
      >
        {elementName}
      </Typography>
      {elementList.map(({value, label}, index) => (
        <Typography
          key={index}
          component="div"
          className={`${classes.licenseLink} ${classes.fullWidth}`}
          role="checkbox"
          aria-checked={checked[index]}
          onClick={() => handleChange(index, label)}
        >
          <Checkbox
            checked={checked[index]}
            onChange={() => handleChange(index, label)}
          />
          <Box component="span" display="block">
            {label}
          </Box>
        </Typography>
      ))}
    </Box>
  )
}

MySidebarElement.propTypes = {
  classes: PropTypes.object.isRequired,
  elementName: PropTypes.string.isRequired,
  elementList: PropTypes.array.isRequired,
};

export default withStyles(styles)(MySidebarElement);