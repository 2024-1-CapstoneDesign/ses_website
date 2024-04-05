import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import withStyles from "@mui/styles/withStyles";
import axios from "axios";

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
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column'
  },
  modalTopContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '2px solid transparent',
    width: '100%',
    height: '20%',
  },
  wideTextFieldStyle: {
    width: '100%',
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
    //https://dummyjson.com/docs/posts
    // const res = await axios.get('https://dummyjson.com/posts/1');
    // console.dir(res.data);
    const res = await axios.post('https://dummyjson.com/products/add', body,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.dir(res.data);
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
          <Typography variant="h6" component="h2">
            Youtube Full URL
          </Typography>
          <Button onClick={handleModalClose}>닫기</Button>
        </Box>
        <TextField label="youtube URL" type="search" classes={classes.wideTextFieldStyle}
                   value={youtubeURL} onChange={handleURLChange}/>
        <Box>
          <TextField label="start time" type="search"
                     value={youtubeStart} onChange={handleStartChange}/>
          <TextField label="end time" type="search"
                     value={youtubeEnd} onChange={handleEndChange}/>
        </Box>
        <Typography id="modal-description" sx={{mt: 2}}>
          모달 내용
        </Typography>
        <Button type="submit" fullWidth variant="contained">
          Submit
        </Button>
      </Box>
    </Modal>
  );
}

export default withStyles(styles, {withTheme: true})(InputModal);