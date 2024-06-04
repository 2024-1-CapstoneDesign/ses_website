import React from "react";
import withStyles from "@mui/styles/withStyles";
import {useLocation} from "react-router-dom";

const styles = (theme) => ({
  blogContentWrapper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    maxWidth: 1280,
    width: "100%",
  },
  wrapper: {
    minHeight: "60vh",
  },
  noDecoration: {
    textDecoration: "none !important",
  },
});

function Result(props) {
  const { classes } = props;

  const location = useLocation();
  const data = location.state?.data;

  return (
    <div>
      <h1>Result Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );


}

export default withStyles(styles, { withTheme: true })(Result);
