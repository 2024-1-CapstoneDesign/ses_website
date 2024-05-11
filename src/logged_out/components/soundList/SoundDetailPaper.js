import withStyles from "@mui/styles/withStyles";
import {Paper, Stack, Typography} from "@mui/material";
import React from "react";


const styles = (theme) => ({
  itemPaperContainer:{
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  textTitle:{
    color: theme.palette.text.primary,
  },
  textDefault:{
    color: theme.palette.text.secondary,
  },
})

function SoundDetailPaper(props) {
  const {classes, title, value} = props;
  return (
    <Paper className={classes.itemPaperContainer}>
      <Stack>
        <Typography variant="subtitle2" gutterBottom className={classes.textTitle}>
          {title}
        </Typography>
        <Typography variant="body1" className={classes.textDefault}>
          {value}
        </Typography>
      </Stack>
    </Paper>
  )
}

export default withStyles(styles, { withTheme: true })(SoundDetailPaper);