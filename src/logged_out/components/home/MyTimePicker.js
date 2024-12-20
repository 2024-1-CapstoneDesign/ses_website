import withStyles from "@mui/styles/withStyles";
import {Box, FormControl, InputLabel, MenuItem, Select, Stack, Typography} from "@mui/material";
import React from "react";

const styles = () => ({
  textContainer: {
    display: 'flex',
    alignItems: 'center',
  },
});


function MyTimePicker(props){
  const { classes, inputLabelId, labelId, value, setValue, text, inputLabel } = props;

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Stack
      direction="row"
      spacing={0}
      mr={1}
    >
      <FormControl sx={{ m: 1, minWidth: 75 }} size="small">
        <InputLabel id={inputLabelId}>{inputLabel}</InputLabel>
        <Select
          labelId={inputLabelId}
          id={labelId}
          value={value}
          label={inputLabel}
          onChange={handleChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200, // set max height of dropdown menu
              },
            },
          }}
          sx={{ borderRadius: '16px' }}
        >
          {[...Array(61).keys()].map(i => (
            <MenuItem key={i} value={i}>{i}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box className={classes.textContainer}>
        <Typography variant="h7">{text}</Typography>
      </Box>
    </Stack>
  );
}

export default withStyles(styles, { withTheme: true })(MyTimePicker);