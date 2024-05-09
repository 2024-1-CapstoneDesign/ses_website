import {withStyles} from "@mui/styles";
import {Box, Typography} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import React, {useState} from "react";
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
  const {classes, elementName, elementList} = props;
  const [checked, setChecked] = useState([false, false, false, false, false]);

  const handleChange = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  return (
    <Box className={classes.sidebarBody}>
      <Typography
        variant="h6"
        className={`font-semibold uppercase mt-4 mb-2 text-[#4829B2] text-gray-900 ${classes.fullWidth}`}
      >
        {elementName}
      </Typography>
      {elementList.map((label, index) => (
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
  )
}

MySidebarElement.propTypes = {
  classes: PropTypes.object.isRequired,
  elementName: PropTypes.string.isRequired,
  elementList: PropTypes.array.isRequired,
};

export default withStyles(styles)(MySidebarElement);