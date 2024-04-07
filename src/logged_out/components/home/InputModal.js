import {Box, Button, IconButton, Modal, TextField, Typography} from "@mui/material";
import React, {Fragment, useState} from "react";
import withStyles from "@mui/styles/withStyles";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

const styles = (theme) => ({
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.background.default,
    width: '50vh',
    height: '50vh',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column'
  },
  modalTopTextContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '2px solid transparent',
    width: '100%',
    height: '20%',
    padding: theme.spacing(2),
  },
  modalTopContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  modalMiddleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '20%',
  },
  wideTextFieldStyle: {
    width: '90%',
  },
  testBorder: {
    border: '2px solid red',
  }
});

const InputModal = (props) => {
  const {classes, modalOpen, setModalOpen} = props;
  const [youtubeURL, setYoutubeURL] = useState('');
  const [youtubeStart, setYoutubeStart] = useState('');
  const [youtubeEnd, setYoutubeEnd] = useState('');

  const handleModalClose = () => setModalOpen(false);
  const handleURLChange = (e) => setYoutubeURL(e.target.value);
  const handleStartChange = (e) => setYoutubeStart(e.target.value);
  const handleEndChange = (e) => setYoutubeEnd(e.target.value);

  const handleSubmit = async (e)=> {
    e.preventDefault();
    const body = {
      title: youtubeURL
    };
    const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    if (regex.test(youtubeStart) && regex.test(youtubeEnd)) {
      const res = await axios.post('https://dummyjson.com/products/add', body,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.dir(res.data);
    } else {
      alert("start and end need to HH:MM:SS format")
    }
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        className={classes.modalStyle}
      >
        <Box className={classes.modalTopContainer}>
          <Box className={classes.modalTopTextContainer}>
            <Typography variant="h6" component="h2">Youtube Full URL</Typography>
            <IconButton onClick={handleModalClose} sx={{bottom: '2rem'}}><CloseIcon/></IconButton>
          </Box>
          <TextField label="youtube URL" type="search" className={classes.wideTextFieldStyle}
                     value={youtubeURL} onChange={handleURLChange}/>
        </Box>
        <Box className={classes.modalMiddleContainer}>
          <Box sx={{textAlign: 'left', width: '100%'}}>
            <Typography variant="h6" component="h2">
              Youtube Start to end
            </Typography>
          </Box>
          <Box sx={{mt: '1rem'}}>
            <TextField label="start time" type="search"
                       value={youtubeStart} onChange={handleStartChange}/>
            <TextField label="end time" type="search"
                       value={youtubeEnd} onChange={handleEndChange}/>
          </Box>
        </Box>
        <Button type="submit" fullWidth variant="contained" sx={{top: '2.6rem'}}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
}

export default withStyles(styles, {withTheme: true})(InputModal);